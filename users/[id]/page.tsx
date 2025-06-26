import UserAvatar from "@/app/my/profile/_components/UserAvatar";
import UserDetailsCard from "@/app/my/profile/_components/UserDetailsCard";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import {
	Badge,
	Button,
	Code,
	Container,
	DataList,
	Flex,
	Heading,
	Separator,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import DeleteUserModal from "../_components/DeleteUserModal";

const UserPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const id = params.id;
	const user = await fetchApi(`/users/${id}`);
	console.log(user);
	return (
		<Container py={"50px"}>
			<Flex justify="between">
				<UserAvatar user={user} message="" />

				<UserDetailsCard user={user} />
				<Flex justify={"end"} align={"center"}>
					<Flex gap="3" direction={"column"} justify={"end"} align={"end"}>
						<Link href={`/users/${user.id}/edit`}>
							<Button color="jade">Edit user profile</Button>
						</Link>
						<DeleteUserModal user={user} />
					</Flex>
				</Flex>
			</Flex>
		</Container>
	);
};

export default UserPage;
