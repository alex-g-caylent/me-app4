"use client";

import { Flex, Card, Link, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FaMagic } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { createChat } from "@/app/utils/api/chats";
import { BiLoaderAlt } from "react-icons/bi";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { toast } from "react-toastify";

const SuggestedPrompt = ({
    promptTitle,
    prompt,
    promptIcon,
}: {
    promptTitle: string;
    promptIcon: string;
    prompt: string;
}) => {
    const jwt = getCookie("jwt");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const chat = await createChat(promptTitle);
            if (chat?.id) {
                router.push(`/my/chats/${chat.id}?prompt=${encodeURIComponent(prompt)}`);
            } else {
                throw new Error("Failed to create chat: No chat ID returned");
            }
        } catch (error) {
            console.error("Error starting chat:", error);
            toast.error("Could not start a new chat.");
            setIsLoading(false);
        }
    }, [prompt, promptTitle, router, isLoading]);

    return (
        <Flex
            direction={"column"}
            maxWidth="300px"
            className="align-middle hover:scale-105 transition-all duration-200"
        >
            <Link onClick={handleClick} color="gray">
                <Card className="shadow-lg md:h-[150px] h-[80px] min-w-[200px] bg-slate-300 hover:bg-slate-100 duration-200">
                    <Flex
                        direction={{ initial: "row", md: "column" }}
                        gap="3"
                        p={{ initial: "1", md: "3" }}
                        align={{ initial: "center", md: "start" }}
                        className="relative"
                    >
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-300/50">
                                <BiLoaderAlt className="animate-spin text-gray-600" size="30" />
                            </div>
                        ) : (
                            <>
                                {promptIcon === "questionmark" && (
                                    <HiMiniQuestionMarkCircle size="30" />
                                )}
                                {promptIcon === "gamepad" && <FaGamepad size="30" />}
                                {promptIcon === "magic" && <FaMagic size="24" />}

                                <Text size={{ initial: "3", md: "4" }}>{promptTitle}</Text>
                            </>
                        )}
                    </Flex>
                </Card>
            </Link>
        </Flex>
    );
};

export default SuggestedPrompt;