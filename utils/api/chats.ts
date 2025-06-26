"use client";

import { toast } from "react-toastify";
import { ClientError } from "./errors";
import { fetchApi, fetchWithAuth } from "../fetchInterceptor";

const ENABLE_STREAMING = true;

export const createChat = (name: string): Promise<Chat> => fetchApi(
    "/my/chats/",
    {
        method: "POST",
        body: JSON.stringify({ name })
    }
);

export const askChatbot = (chatId: string, prompt: string) => fetchApi(
    "/chatbot/ask",
    {
        method: "POST",
        body: JSON.stringify({ chatId, prompt })
    }
);

export const askChatbotStream = async (
    chatId: string,
    prompt: string,
    options?: {
        enableStreaming?: boolean;
        onChunk?: (text: string) => void;
        onCitations?: (citations: any[]) => void;
        onComplete?: () => void;
        onError?: (error: string) => void;
    }
) => {
    const useStreaming = options?.enableStreaming ?? ENABLE_STREAMING;
    
    if (!useStreaming || !options?.onChunk) {
        // Fallback to regular API call
        return await fetchApi("/chatbot/ask", {
            method: "POST",
            body: JSON.stringify({ chatId, prompt })
        });
    }

    const url = "/chatbot/ask?stream=true";
    
    try {
        const response = await fetchWithAuth(url, {
            method: "POST",
            body: JSON.stringify({ chatId, prompt }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        await handleStreamingResponse(response, options);
        return { success: true };
    } catch (error) {
        console.error('Streaming request failed:', error);
        options.onError?.(error instanceof Error ? error.message : 'Streaming failed');
        throw error;
    }
};

async function handleStreamingResponse(response: Response, callbacks: any) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
        throw new Error('No response body available for streaming');
    }

    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                // Process any remaining data in buffer
                if (buffer.trim()) {
                    processBufferLines(buffer, callbacks);
                }
                callbacks.onComplete?.();
                break;
            }

            // Decode chunk and add to buffer
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Process complete lines
            const lines = buffer.split('\n');
            // Keep the last incomplete line in buffer
            buffer = lines.pop() || '';
            
            // Process complete lines
            for (const line of lines) {
                processStreamLine(line, callbacks);
            }
        }
    } catch (error) {
        console.error('Streaming error:', error);
        callbacks.onError?.(error instanceof Error ? error.message : 'Streaming failed');
        throw error;
    } finally {
        reader.releaseLock();
    }
}

function processBufferLines(buffer: string, callbacks: any) {
    const lines = buffer.split('\n');
    for (const line of lines) {
        processStreamLine(line, callbacks);
    }
}

function processStreamLine(line: string, callbacks: any) {
    if (!line.trim()) return;

    if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        
        if (!data || data === '[DONE]') {
            callbacks.onComplete?.();
            return;
        }

        try {
            const event = JSON.parse(data);

            switch (event.type) {
                case 'chunk':
                case 'text':
                    if (event.text || event.content) {
                        callbacks.onChunk?.(event.text || event.content);
                    }
                    break;
                case 'citations':
                    if (event.citations) {
                        callbacks.onCitations?.(event.citations);
                    }
                    break;
                case 'complete':
                case 'done':
                    callbacks.onComplete?.();
                    return;
                case 'error':
                    callbacks.onError?.(event.error || 'Unknown streaming error');
                    return;
                default:
                    // Handle plain text or other formats
                    if (typeof event === 'string') {
                        callbacks.onChunk?.(event);
                    } else if (event.content) {
                        callbacks.onChunk?.(event.content);
                    }
                    break;
            }
        } catch (parseError) {
            // If JSON parsing fails, treat as plain text
            callbacks.onChunk?.(data);
        }
    }
}