"use client";
import { Dialog, Flex, Separator, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { PiChatsDuotone } from "react-icons/pi";
import MobileChatsLink from "./MobileChatsLink";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import { useOnMount } from "@/app/utils/hooks/useOnMount";

const MobileChatsMenu = () => {
	const [chats, setChats] = useState<Chat[]>([]);

	useOnMount(() => {
		fetchApi("/my/chats/")
			.then((json) => setChats(json));
	}, []);

	return (
		<Flex
			display={{ initial: "flex", md: "none" }}
			p="3"
			className="border-[1px] border-gray-600 rounded-full"
			onClick={() => console.log("click")}
		>
			<Dialog.Root>
				<Dialog.Trigger>
					<PiChatsDuotone size="30" />
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Title>Your chats</Dialog.Title>
					<Dialog.Description size="2" mb="4">
						Continue the discussions you started before...
					</Dialog.Description>
					<Separator my="3" size="4" />
					{!chats && <Text>Sorry... no chats started yet</Text>}
					<Flex direction={"column"}>
						{chats.map((chat: Chat) => (
							<MobileChatsLink chat={chat} key={chat.id} />
						))}
					</Flex>
				</Dialog.Content>
			</Dialog.Root>
		</Flex>
	);
};

export default MobileChatsMenu;
