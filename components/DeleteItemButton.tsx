"use client";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteItemButton = ({ kind, id }: { kind: String; id: String }) => {
	const router = useRouter();
	const handleClick = function (kind: string, id: string) {
		const jwt = getCookie("jwt");
		try {
			console.log("delete");
			const req = fetch(`${process.env.NEXT_PUBLIC_APIBASE}/${kind}s/${id}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + jwt,
				},
			});
			router.push("/articles");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="outline" color="gray">
					Delete Article
				</Button>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="800px">
				<Dialog.Title>Delete "{kind}</Dialog.Title>
				<Flex direction="column" gap="3">
					<Text>
						Are you sure you want to delete this {kind}? This action cannot be
						undone.
					</Text>
					<Button
						variant="solid"
						onClick={() => handleClick(kind, id)}
					>{`Delete ${kind}`}</Button>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default DeleteItemButton;
