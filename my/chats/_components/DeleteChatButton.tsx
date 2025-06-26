"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteChatButton = ({ chatId }: { chatId: String }) => {
	const [cliked, setClicked] = useState(false);
	const router = useRouter();
	const jwt = getCookie("jwt");

	function handleClick(id: string) {
		setClicked(true);
		const req = fetch(`${process.env.NEXT_PUBLIC_APIBASE}/my/chats/${id}`, {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + jwt,
			},
			method: "DELETE",
		});
		document.location.href = "/my/chats";
	}
	return (
		<Button
			onClick={() => handleClick(chatId)}
			loading={cliked}
			variant="outline"
		>
			<TrashIcon />
		</Button>
	);
};

export default DeleteChatButton;
