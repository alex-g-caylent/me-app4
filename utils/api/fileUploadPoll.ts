import { getCookie } from "../cookies";
import { useState, useEffect } from 'react';

// Types
export interface FileAnalysis {
    pages: number;
    title: string;
    language: string;
    confidence: string;
    key_topics: string[];
    description: string;
    document_type: string;
    training_level: string;
    medical_specialty: string;
}

export interface FileProcessingResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    uuid: string;
    filename: string;
    filekey: string;
    bucket: string;
    status: 'processing' | 'completed' | 'failed';
    timestamp: string;
    processedAt: string;
    fileSize: number;
    textLength: number;
    analysis: FileAnalysis;
    errorMessage: string | null;
}

export interface FileStatus {
    status: 'processing' | 'completed' | 'failed';
    analysis: FileAnalysis | null;
    error: Error | null;
}

export interface FileStatusMap {
    [uuid: string]: FileStatus;
}

/**
 * Simple function to poll a file's processing status until completion
 * @param uuid The UUID of the file to poll
 * @param apiBaseUrl The base URL for the API
 * @param onComplete Callback when processing is complete
 * @param onError Callback when an error occurs
 * @param pollInterval Interval between polls in ms
 * @param maxRetries Maximum number of retries
 * @returns A function to cancel polling
 */
export const pollFileStatus = (
    uuid: string,
    options: {
        apiBaseUrl?: string;
        onComplete?: (response: FileProcessingResponse) => void;
        onError?: (error: Error) => void;
        pollInterval?: number;
        maxRetries?: number;
    } = {}
): () => void => {
    const {
        apiBaseUrl = `${process.env.NEXT_PUBLIC_APIBASE}/article-idp`,
        onComplete = () => {},
        onError = () => {},
        pollInterval = 2000,
        maxRetries = 30
    } = options;

    let retryCount = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const checkStatus = async () => {
        try {
            const jwt = await getCookie("jwt");
            const response = await fetch(`${apiBaseUrl}/${uuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: jwt ? "Bearer " + jwt : '',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if response has content before parsing JSON
            const contentType = response.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                // No content or not JSON, retry
                scheduleNextPoll();
                return;
            }

            const result: FileProcessingResponse = await response.json();
            
            if (result.status === 'completed' || result.status === 'failed') {
                // Processing finished
                onComplete(result);
            } else {
                // Still processing, schedule next poll
                scheduleNextPoll();
            }
        } catch (error) {
            retryCount++;
            
            if (retryCount >= maxRetries) {
                onError(error instanceof Error ? error : new Error('Polling failed'));
            } else {
                // Retry
                scheduleNextPoll();
            }
        }
    };

    const scheduleNextPoll = () => {
        timeoutId = setTimeout(checkStatus, pollInterval);
    };

    // Start polling immediately
    checkStatus();

    // Return a function to cancel polling
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };
};

/**
 * Hook to manage multiple file processing statuses
 */
export const useFileProcessing = () => {
    const [fileStatuses, setFileStatuses] = useState<FileStatusMap>({});
    const [cancelFunctions] = useState<Map<string, () => void>>(new Map());

    // Add a file to be processed and start polling
    const trackFile = (uuid: string, apiBaseUrl?: string) => {
        // Initialize file status
        setFileStatuses(prev => ({
            ...prev,
            [uuid]: {
                status: 'processing',
                analysis: null,
                error: null
            }
        }));

        // Start polling
        const cancelPolling = pollFileStatus(uuid, {
            apiBaseUrl,
            onComplete: (response) => {
                setFileStatuses(prev => ({
                    ...prev,
                    [uuid]: {
                        status: response.status,
                        analysis: response.analysis || null,
                        error: response.status === 'failed' ? new Error(response.errorMessage || 'Processing failed') : null
                    }
                }));
                
                // Clean up
                cancelFunctions.delete(uuid);
            },
            onError: (error) => {
                setFileStatuses(prev => ({
                    ...prev,
                    [uuid]: {
                        ...prev[uuid],
                        error
                    }
                }));
                
                // Clean up
                cancelFunctions.delete(uuid);
            }
        });

        // Store cancel function
        cancelFunctions.set(uuid, cancelPolling);
    };

    // Stop tracking a file
    const stopTracking = (uuid: string) => {
        const cancelFn = cancelFunctions.get(uuid);
        if (cancelFn) {
            cancelFn();
            cancelFunctions.delete(uuid);
        }
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            cancelFunctions.forEach(cancel => cancel());
        };
    }, []);

    return {
        fileStatuses,
        trackFile,
        stopTracking
    };
};