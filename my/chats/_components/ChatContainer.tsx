"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { Flex } from "@radix-ui/themes";
import ChatMessages from "./ChatMessages";
import NewChatbot from "./NewChatbot";
import { askChatbotStream } from "@/app/utils/api/chats";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

interface ChatContainerProps {
  chat: any; // Your chat type
  initialPrompt?: string;
}

export default function ChatContainer({ chat, initialPrompt }: ChatContainerProps) {
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const initialPromptProcessedRef = useRef(false);

  const handleStreamingText = useCallback((value: string | ((prev: string) => string)) => {
    setStreamingMessage(value);
  }, []);

  const handleStreamingStateChange = useCallback((streaming: boolean) => {
    setIsStreaming(streaming);
    if (!streaming) {
      setStreamingMessage('');
    }
  }, []);

  useEffect(() => {
    if (initialPrompt && !initialPromptProcessedRef.current) {
      initialPromptProcessedRef.current = true; // Mark as processed immediately

      handleStreamingStateChange(true);
      setStreamingMessage('');

      askChatbotStream(chat.id, initialPrompt, {
        enableStreaming: true,
        onChunk: (text) => handleStreamingText(prev => prev + text),
        onComplete: () => {
          handleStreamingStateChange(false);
          setTimeout(() => {
            router.replace(pathname, { scroll: false });
          }, 100);
        },
        onError: (error: string) => {
          toast.error(`Question failed: ${error}`);
          handleStreamingStateChange(false);
        }
      });
    }
  }, [initialPrompt, chat.id, handleStreamingStateChange, handleStreamingText, router]);

  return (
    <Flex direction="column" height="100%" justify="between">
      <ChatMessages
        initialMessages={chat.messages}
        streamingMessage={streamingMessage}
        isStreaming={isStreaming}
      />
      
      <Flex className="w-[100%]" justify={"between"}>
        <NewChatbot 
          chatId={chat.id}
          onStreamingText={handleStreamingText}
          onStreamingStateChange={handleStreamingStateChange}
          isLoading={isStreaming}
        />
      </Flex>
    </Flex>
  );
}