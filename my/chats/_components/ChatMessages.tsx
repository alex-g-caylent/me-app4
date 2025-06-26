"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import Message from "./Message";
import { useEffect, useRef, useCallback } from "react";
import { RiRobot3Line } from "react-icons/ri";

interface ChatMessagesProps {
    initialMessages: any[];
    streamingMessage: string;
    isStreaming: boolean;
}

export default function ChatMessages({
    initialMessages,
    streamingMessage,
    isStreaming
}: ChatMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastMessageCountRef = useRef(initialMessages.length);
    const lastStreamingTextRef = useRef('');

    // Debounced scroll function to prevent excessive scrolling
    const scrollToBottom = useCallback(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Only scroll when:
    // 1. New messages are added (not streaming updates)
    // 2. Streaming just started
    // 3. Streaming text has grown significantly (every 100 chars to reduce scroll frequency)
    useEffect(() => {
        const messageCountChanged = initialMessages.length !== lastMessageCountRef.current;
        const streamingJustStarted = isStreaming && !lastStreamingTextRef.current;
        const streamingTextGrew = streamingMessage.length > lastStreamingTextRef.current.length + 100;

        if (messageCountChanged || streamingJustStarted || streamingTextGrew) {
            scrollToBottom();
            lastMessageCountRef.current = initialMessages.length;
            lastStreamingTextRef.current = streamingMessage;
        }
    }, [initialMessages.length, isStreaming, streamingMessage, scrollToBottom]);

    return (
        <Flex
            direction="column"
            gap="3"
            position={"relative"}
            overflowY={"auto"}
            minWidth={"100%"}
            width={"100%"}
            height={"100%"}
        >
            <Flex
                direction={"column"}
                position={"absolute"}
                width={"100%"}
                minWidth={"100%"}
            >
                {/* Existing saved messages */}
                {initialMessages.map((message: any, index: number) => (
                    <Message
                        key={message.id}
                        message={message}
                        user={index % 2 === 1}
                    />
                ))}

                {/* Streaming message appears here in the flow */}
                {isStreaming && streamingMessage && (
                    <div className="bg-slate-50 rounded-2xl hover:shadow-md duration-150 hover:translate-y-[-2px] border-slate-100 border-2 mr-3">
                        <Flex align="center" gap="2" mb="2">
                            <Box width={"50px"}>
                                <RiRobot3Line size="20" />
                            </Box>
                        </Flex>
                        <Text style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {streamingMessage}
                            <span className="animate-pulse ml-1">|</span>
                        </Text>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </Flex>
        </Flex>
    );
}