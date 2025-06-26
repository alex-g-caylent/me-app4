"use client";
import ArticleCard from "@/app/articles/_components/ArticleCard";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Grid, Spinner, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const LibraryArticles = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();

	const fetchArticles = async () => {
		const tag = searchParams.get("tag") || "";
		const apiPaths: Record<string, string> = {
			"": "/my/articles",
			saved: "/my/articles/status/pinned",
			"in-progress": "/my/articles/status/last-viewed",
			"recommended-for-you": "/my/articles/suggested",
		};

		const data = await fetchApi(apiPaths[tag]);
		setArticles(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchArticles();
	}, [searchParams]);

	// Filter articles based on search query
	const searchQuery = searchParams.get("search")?.toLowerCase() || "";
	const filteredArticles = articles.filter((article) =>
		article.title.toLowerCase().includes(searchQuery)
	);

	return loading ? (
		<Flex align={"center"} justify={"center"} height="100vh">
			<Spinner size="3" />
		</Flex>
	) : (
		<Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="5">
			{filteredArticles.length === 0 ? (
				<Flex align="center" justify="center" height="50vh">
					<Text size="3" color="gray">
						No articles found
					</Text>
				</Flex>
			) : (
				filteredArticles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))
			)}
		</Grid>
	);
};

export default LibraryArticles;
