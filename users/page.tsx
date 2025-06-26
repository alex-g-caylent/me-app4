import { Button, Container, Flex, Heading, Separator } from "@radix-ui/themes";
import React, { Suspense } from "react";
import UsersTable from "./_components/UsersTable";
import Link from "next/link";
import { fetchApi } from "../utils/fetchInterceptor";

const Users = async (props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) => {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const users = await fetchApi("/users");
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return (
		<Flex
			direction="column"
			className="mx-auto mt-[10px]"
			px={{ initial: "1", md: "5" }}
		>
			<Flex justify="between" align="center">
				<Flex direction="column" my="2">
					<Heading>Users</Heading>
					<p>Here you can find all the users of your business unit</p>
				</Flex>
				<Flex align={"center"} gap="5">
					<Link href="/users/new/">
						<Button>Add a new user</Button>
					</Link>
				</Flex>
			</Flex>
			<Separator my="3" size="4" />
			<Suspense>
				{users ? <UsersTable users={users} /> : "Sorry, no users added yet"}
			</Suspense>
		</Flex>
	);
};

export default Users;
