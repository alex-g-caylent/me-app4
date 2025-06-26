import { Box, Flex, Grid, Heading, Text, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import carouselStyles from "../components/carousel/carousel.module.css";
import { Carousel } from "../components/carousel/Carousel";
import ArticleCard from "@/app/articles/_components/ArticleCard";
import CompetencyCard from "./CompetencyCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
	// Check for JWT token
	const cookieStore = await cookies();
	const jwt = cookieStore.get("jwt");

	if (!jwt) {
		redirect("/login");
	}

	try {
		const [competencies, suggestedArticles, fetchedArticles] = await Promise.all([
			fetchApi("/competencies"),
			fetchApi("/my/articles/suggested"),
			fetchApi("/my/articles", {
				next: {
					revalidate: 3600 // Cache for 1 hour
				}
			}),
		]);

		// Add logging to debug the response data
		console.log("Home page data:", {
			competenciesIsArray: Array.isArray(competencies),
			competenciesLength: competencies?.length,
			suggestedArticlesIsArray: Array.isArray(suggestedArticles),
			suggestedArticlesLength: suggestedArticles?.length,
			myArticlesIsArray: Array.isArray(fetchedArticles),
			myArticlesLength: fetchedArticles?.length,
		});

		// Ensure we have arrays, even if empty
		const safeCompetencies = Array.isArray(competencies) ? competencies : [];
		const safeSuggestedArticles = Array.isArray(suggestedArticles)
			? suggestedArticles
			: [];
		
		// Get 10 random articles from the fetched articles
		const myArticles = Array.isArray(fetchedArticles) 
			? [...fetchedArticles].sort(() => 0.5 - Math.random()).slice(0, 10)
			: [];

		const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];
		return (
			<Flex direction="column" p="5">
				<Flex mb="3">
					<Box>
						<Heading>Main Library</Heading>
						<Text>Grouped by Competency</Text>
					</Box>
				</Flex>
				<Grid columns={{ initial: "2", sm: "4" }} gap="3" width="auto">
					{safeCompetencies.map((competency: Competency, index: number) =>
						index === 0 ? (
							<Link href={`/mylibrary`} key={competency?.id || index}>
								<CompetencyCard
									competency={competency}
									colors={colors}
									index={index}
								/>
							</Link>
						) : (
							<Tooltip
								key={competency?.id?.toString() || index}
								content={"Not available yet: coming soon"}
							>
								<CompetencyCard
									competency={competency}
									colors={colors}
									index={index}
								/>
							</Tooltip>
						)
					)}
				</Grid>

				<Flex mt="5" mb="3">
					<Box>
						<Heading>Recommended for you</Heading>
						<Text>Based on your assessment and interests</Text>
					</Box>
				</Flex>
				<Carousel>
					{safeSuggestedArticles.length > 0 ? (
						safeSuggestedArticles.map((suggestedArticle: Article) => (
							<ArticleCard
								key={suggestedArticle?.id?.toString() || "suggested-article"}
								article={suggestedArticle}
								className={carouselStyles.item}
							/>
						))
					) : (
						<Text color="gray">No suggested articles available</Text>
					)}
				</Carousel>

				<Flex mt="5" mb="3">
					<Box>
						<Heading>Trending content</Heading>
						<Text>Trending now among Maestro&apos;s users</Text>
					</Box>
				</Flex>
				<Carousel>
					{myArticles.length > 0 ? (
						myArticles.map((article: Article) => (
							<ArticleCard
								key={article?.id?.toString() || "my-article"}
								article={article}
							/>
						))
					) : (
						<Text color="gray">No trending articles available</Text>
					)}
				</Carousel>
			</Flex>
		);
	} catch (error) {
		console.error(error);
	}
};

export default Home;
