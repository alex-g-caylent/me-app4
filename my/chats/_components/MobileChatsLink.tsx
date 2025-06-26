"use client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const MobileChatsLink = ({ chat }: { chat: Chat }) => {
	return (
		<Link href={`/my/chats/${chat.id}`}>
			<Flex gap="3" p="2" mb="1" className="border-[1px] rounded-md">
				<Text>{chat.name}</Text>
			</Flex>
		</Link>
	);
};

export default MobileChatsLink;
