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

const LoadingArticles = () => {
	return (
		<Flex
			direction="column"
			className="mx-auto mt-[10px]"
			px={{ initial: "1", md: "5" }}
		>
			<Flex justify="between" align="center">
				<Flex direction="column" my="2">
					<Heading>Articles</Heading>
					<p>Here you can find all the articles</p>
				</Flex>
				<Flex align={"center"} gap="5">
					<Button>Add a new article</Button>
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

export default LoadingArticles;
