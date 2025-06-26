"use client";

import { Flex, Spinner, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { createChat } from "@/app/utils/api/chats";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

const NewChat = () => {
    const router = useRouter();
    const jwt = getCookie("jwt");
    const ref = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Flex direction="column" gap="3">
            {isSubmitting && (
                <Flex
                    className="bg-green-200 rounded-full"
                    height={"60px"}
                    align={"center"}
                    px="5"
                    gap="3"
                    my="3"
                >
                    <Spinner size="3" />
                    <Text>Starting new chat...</Text>
                </Flex>
            )}

            <Formik
                initialValues={{
                    name: "",
                }}
                onSubmit={async ({ name: prompt }) => {
                    if (!prompt.trim()) return;
                    try {
                        setIsSubmitting(true);
                        const chat = await createChat(prompt);

                        if (chat?.id) {
                            router.push(`/my/chats/${chat.id}?prompt=${encodeURIComponent(prompt)}`, { scroll: false });
                        } else {
                            toast.error("Could not create a new chat.");
                            setIsSubmitting(false);
                        }
                    } catch (error) {
                        console.error("Error starting new chat:", error);
                        toast.error("Could not create a new chat.");
                        setIsSubmitting(false);
                    }
                }}
            >
                <Form className="w-[100%]" ref={ref}>
                    <Flex
                        className="w-[100%] chatbot"
                        align={"center"}
                        style={{ width: "100%" }}
                    >
                        <Field
                            name="name"
                            id="prompt"
                            className="w-[100%] chatbot border-none"
                            style={{ width: "100%" }}
                            autoFocus={true}
                            placeholder="Ask me something"
                            disabled={isSubmitting}
                        />
                        <CheckCircledIcon
                            width="30"
                            height="30"
                            className="text-gray-400"
                        />
                    </Flex>
                </Form>
            </Formik>
        </Flex>
    );
};

export default NewChat;