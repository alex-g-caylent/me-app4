"use client";

import { askChatbotStream } from "@/app/utils/api/chats";
import { ClientError } from "@/app/utils/api/errors";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Props {
  chatId: string;
  onStreamingText?: (value: string | ((prev: string) => string)) => void;
  onStreamingStateChange?: (streaming: boolean) => void;
  isLoading?: boolean;
}

const NewChatbot = ({ chatId, onStreamingText, onStreamingStateChange, isLoading }: Props) => {
  const ref = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Feature flag for streaming
  const enableStreaming =  true;

  // Use callback to prevent recreating the function on every render
  const handleStreamingText = useCallback((text: string) => {
    if (onStreamingText) {
      onStreamingText(prev => prev + text);
    }
  }, [onStreamingText]);

  const handleStreamingReset = useCallback(() => {
    if (onStreamingText) {
      onStreamingText('');
    }
  }, [onStreamingText]);

  return (
    <Flex justify="between" width={"100%"} direction={"column"} mt="3">
      {submitting || isLoading && (
        <Flex
          className="bg-green-200 rounded-full"
          height={"60px"}
          align={"center"}
          px="5"
          gap="3"
          my="3"
        >
          <Spinner size="3" />
          <Text>Interrogating the knowledge base...</Text>
        </Flex>
      )}

      <Formik
        initialValues={{
          prompt: "",
          chatId: chatId,
        }}
        onSubmit={async ({ prompt }) => {
          if (!prompt.trim()) return;
          
          setSubmitting(true);
          ref.current?.reset();
          
          try {
            if (enableStreaming && onStreamingText && onStreamingStateChange) {
              // Streaming mode
              onStreamingStateChange(true);
              handleStreamingReset(); // Reset streaming text

              await askChatbotStream(chatId, prompt.trim(), {
                enableStreaming: true,
                
                onChunk: handleStreamingText,
                
                onComplete: () => {
                  setSubmitting(false);
                  onStreamingStateChange(false);
                  // Use setTimeout to ensure state updates are processed
                  setTimeout(() => {
                    router.refresh(); // Refresh to show saved message
                  }, 100);
                },
                
                onError: (error: string) => {
                  toast.error(`Question failed: ${error}`);
                  setSubmitting(false);
                  onStreamingStateChange(false);
                  handleStreamingReset();
                }
              });
            } else {
              // Regular mode (existing logic)
              const answer = await askChatbotStream(chatId, prompt.trim(), { 
                enableStreaming: false 
              });
              
              if (answer?.chatId) {
                router.push(`/my/chats/${answer.chatId}`);
              }
              setSubmitting(false);
            }
          } catch (error) {
            if (error instanceof ClientError) {
              toast.error(`Question failed: ${error?.message || 'Unknown error'}`);
            } else {
              toast.error('An unexpected error occurred');
            }
            setSubmitting(false);
            onStreamingStateChange?.(false);
            handleStreamingReset();
          }
        }}
      >
        <Form className="w-[100%]" style={{ width: "100%" }} ref={ref}>
          <Flex align="center" style={{ width: "100%" }}>
            <Flex direction="column" className="w-[100%]">
              <Flex
                className="w-[100%] chatbot"
                align={"center"}
                style={{ width: "100%" }}
              >
                <Field
                  name="prompt"
                  id="prompt"
                  className="w-[100%] chatbot border-none"
                  style={{ width: "100%" }}
                  placeholder="Ask me something"
                  disabled={submitting}
                />
                <CheckCircledIcon
                  width="30"
                  height="30"
                  className="text-gray-400"
                />
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Formik>
    </Flex>
  );
};

export default NewChatbot;