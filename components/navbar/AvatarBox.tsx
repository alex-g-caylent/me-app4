"use client";
import { Avatar, Flex, Heading, Box } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const AvatarBox = ({ user }: { user: User }) => {
	return (
		<Flex align="center" mt="3" ml="4">
			<Link href={`/my/profile`}>
				<Avatar fallback={user.firstName[0]} radius="full" size="5" />
			</Link>
			<Box ml="4">
				<Heading as="h3">{user.firstName}</Heading>
				<Heading as="h4" weight="regular" size="4">
					Welcome back
				</Heading>
			</Box>
		</Flex>
	);
};

export default AvatarBox;
