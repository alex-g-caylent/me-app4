"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Separator, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteUserModal = ({ user }: { user: User }) => {
	const [dialog, setDialog] = useState(false);
	const router = useRouter();
	const deleteUser = (userId: String) => {
		setDialog(false);
		const jwt = getCookie("jwt");
		const request = fetch(
			`${process.env.NEXT_PUBLIC_APIBASE}/users/${userId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + jwt,
				},
				method: "DELETE",
			}
		);
		router.replace("/users");
	};
	return (
		<Dialog.Root open={dialog}>
			<Dialog.Trigger>
				<Button variant="outline" onClick={() => setDialog(true)}>
					<TrashIcon />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title>
					You are deleting the user: {user.firstName} {user.lastName}
				</Dialog.Title>
				<Text>
					Are you sure you want to proceed? This user won't have access to
					Maestro anymore...
				</Text>
				<Separator my="3" size="4" />
				<Button color="red" onClick={() => deleteUser(user.id)}>
					Delete user
				</Button>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default DeleteUserModal;
