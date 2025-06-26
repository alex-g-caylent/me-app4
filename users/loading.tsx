import {
	Flex,
	Spinner,
	Skeleton,
	Separator,
	Heading,
	Text,
	Button,
} from "@radix-ui/themes";
import React from "react";

const LoadingUsers = () => {
	return (
		<Flex
			direction="column"
			className="mx-auto mt-[10px]"
			px={{ initial: "1", md: "5" }}
		>
			<Flex justify="between" align="center">
				<Flex direction="column" my="2">
					<Heading>Users</Heading>
					<p>Here you can find all the users of your bussiness unit</p>
				</Flex>
				<Flex align={"center"} gap="5">
					<Button>Add a new user</Button>
				</Flex>
			</Flex>
			<Separator my="3" size="4" />
			<Flex gap="3" direction={"column"}>
				<Skeleton minHeight={"40px"} width={"100%"}></Skeleton>
				<Skeleton minHeight={"40px"} width={"100%"}></Skeleton>
				<Skeleton minHeight={"40px"} width={"100%"}></Skeleton>
				<Skeleton minHeight={"40px"} width={"100%"}></Skeleton>
				<Skeleton minHeight={"40px"} width={"100%"}></Skeleton>
			</Flex>
		</Flex>
	);
};

export default LoadingUsers;
