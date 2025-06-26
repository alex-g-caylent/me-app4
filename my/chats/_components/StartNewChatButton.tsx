import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const StartNewChatButton = () => {
	return (
		<Link href="/my/chats/">
			<Button>New chat</Button>
		</Link>
	);
};

export default StartNewChatButton;
