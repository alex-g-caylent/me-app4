import { Flex, Box, Heading, Text, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ArticleCard from "../../articles/_components/ArticleCard";
import { fetchApi } from "../../utils/fetchInterceptor";
import { FaBookmark } from "react-icons/fa6";
import { Carousel } from "@/app/components/carousel/Carousel";

interface Article {
	id: string;
	title: string;
	description: string;
	cover: string;
	duration: number;
	aiGenerated: boolean;
	internalUseOnly: boolean;
}

interface Competency {
	id: string;
	name: string;
	description: string;
	color: string;
}

export default async function MyArticles() {
	const [competencies, myArticles, suggestedArticles] = await Promise.all([
		fetchApi("/competencies"),
		fetchApi("/my/articles/pinned"),
		fetchApi("/my/articles/suggested"),
	]);

	const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<>
			<main className="flex flex-col p-5">
				<Flex mb="3">
					<Box>
						<Heading>Main Library</Heading>
						<Text>Grouped by Competency</Text>
					</Box>
				</Flex>
				<Grid columns={{ initial: "2", sm: "4" }} gap="3" width="auto">
					{competencies.length === 0 && (
						<Text>Here you should have some competencies</Text>
					)}
					{competencies.map((competency: Competency, index: number) => (
						<Link
							href={`/mylibrary/?competency=${competency.name
								.replace(/\s+/g, "-")
								.toLowerCase()}`}
							key={competency.id}
						>
							<Flex
								width="100"
								minHeight={"150px"}
								align={"center"}
								className={`border-none w-100 p-6 ${colors[index]} rounded-md hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out md:py-10`}
							>
								<Text weight="light" className="px-1 py-1 text-lg font-bold">
									{competency.name}
								</Text>
							</Flex>
						</Link>
					))}
				</Grid>

				<Flex mt="5" mb="3">
					<Box>
						<Heading>Saved by you</Heading>
						<Text>Grouped by Competency</Text>
					</Box>
				</Flex>
				<Carousel>
					{myArticles.map((article: Article) => (
						<Flex>
							<FaBookmark
								size="22"
								className="absolute top-3 right-3 z-50"
								color="cyan"
							/>
							<ArticleCard key={article.id} article={article} />
						</Flex>
					))}
				</Carousel>
				<Flex mt="5" mb="3">
					<Box>
						<Heading>Top Related Learning Activities</Heading>
						<Text>What's trending</Text>
					</Box>
				</Flex>
				<Carousel>
					{suggestedArticles.length === 0 && (
						<Flex>
							<Text>Here you should see some articles</Text>
						</Flex>
					)}
					{suggestedArticles.map((article: Article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</Carousel>
				<div className="flex flex-col-mt-10"></div>
			</main>
		</>
	);
}
