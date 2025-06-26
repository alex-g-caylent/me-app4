import { Flex, Separator, Text, Heading } from "@radix-ui/themes";
import React from "react";
import Chatslist from "./ChatsList";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import StartNewChatButton from "./StartNewChatButton";

const Sidebar = async () => {
	const chats = await fetchApi("/my/chats");
	return (
		<>
			<Flex
				display={{ initial: "none", md: "flex" }}
				px="5"
				width={"340px"}
				minWidth={"340px"}
				className="min-h-80 bg-navbar"
				direction="column"
				justify="between"
			>
				<Flex className="min-h-[500px]" direction={"column"}>
					<Separator size="4" mb="3" color="gray" />
					<Flex justify={"between"} align={"center"}>
						<Heading size="4" weight="light">
							Recent Chats
						</Heading>
						<StartNewChatButton />
					</Flex>
					<Flex
						direction={"column"}
						position={"absolute"}
						overflowY={"auto"}
						maxWidth={"300px"}
						width={"100%"}
						height={"74vh"}
						pr="4"
						mt="9"
					>
						{chats.length === 0 && (
							<Text size="2">
								No chats in here yet
								<br />
								Let&apos;s start conversation.
							</Text>
						)}
						<ul className="list-none">
							{chats.map((chat: Chat) => (
								<Chatslist chat={chat} key={chat.id} />
							))}
						</ul>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default Sidebar;
