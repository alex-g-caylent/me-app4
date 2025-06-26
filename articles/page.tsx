import { Button, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React, { Suspense } from "react";
import Link from "next/link";
import { fetchApi } from "../utils/fetchInterceptor";
import ArticlesTable from "./_components/ArticlesTable";
import IngestionJob from "./_components/IngestionJob";

const getArticles = async () => {
	try {
		return await fetchApi("/articles");
	} catch (error) {
		console.error("Error fetching articles", error);
		return [];
	}
};

const ArticlesPage = async () => {
	const articles = await getArticles();

	return (
		<Flex direction="column" gap="4" p="5">
			<Flex
				direction={{ initial: "column", md: "row" }}
				justify="between"
				align={"center"}
				gap={{ initial: "3", md: "0" }}
				mb="4"
			>
				<Flex align={"center"} gap="5">
					<Flex direction="column">
						<Heading>Content</Heading>
						<Text>In this section you can find all the articles</Text>
					</Flex>
					<Separator orientation="vertical" size="3" />
					<Flex>
						<Link href="/articles/new">
							<Button>Add a new piece of content</Button>
						</Link>
					</Flex>
				</Flex>
				<Card>
					<IngestionJob />
				</Card>
			</Flex>
			<Suspense>
				<ArticlesTable articles={articles} />
			</Suspense>
		</Flex>
	);
};

export default ArticlesPage;
