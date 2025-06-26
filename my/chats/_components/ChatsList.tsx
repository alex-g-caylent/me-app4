"use client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteChatButton from "./DeleteChatButton";

const Chatslist = ({ chat }: { chat: Chat }) => {
	const path = usePathname();
	return (
		<li
			key={chat.id}
			className={
				path.split("chats/").pop() === chat.id
					? "my-1 py-1 px-3 bg-stone-100 duration-200 rounded-md border-[1px] border-slate-400"
					: "mb-2 py-2 px-3 bg-slate-50 hover:bg-slate-200 duration-200 rounded-md"
			}
		>
			<Flex justify={"between"} align={"center"} width={"100%"}>
				<Link className="w-[100%]" href={"/my/chats/" + chat.id}>
					<Text size="2">{chat.name}</Text>
				</Link>
				<DeleteChatButton chatId={chat.id} />
			</Flex>
		</li>
	);
};

export default Chatslist;
