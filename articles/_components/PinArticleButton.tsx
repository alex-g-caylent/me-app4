"use client";
import { Flex, Tooltip } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";

interface ArticleProgress {
	userId: string;
	articleId: string;
	pinned: boolean;
	viewedAt: string;
}

interface PinnedArticle {
	id: string;
	title: string;
	description: string;
	cover: string;
	mimeType: string;
	extension: string;
	size: number;
	key: string;
	createdAt: string;
	updatedAt: string;
	articleProgress: ArticleProgress;
}

const PinArticleButton = ({ articleId }: { articleId: string }) => {
	const [isPinned, setIsPinned] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Function to toggle pinned status
	const togglePinned = async (status: boolean) => {
		try {
			const jwt = getCookie("jwt");
			const data = { pinned: status };

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/my/articles/${articleId}/toggle/pinned`,
				{
					method: "PATCH",
					body: JSON.stringify(data),
					headers: {
						Authorization: `Bearer ${jwt}`,
						"Content-type": "Application/json",
					},
				}
			);

			if (response.ok) {
				setIsPinned(status);
			} else {
				console.error("Error toggling pinned status:", await response.text());
			}
		} catch (error) {
			console.error("Error in togglePinned:", error);
		}
	};

	// Check initial pinned status from the new endpoint
	useEffect(() => {
		const checkPinnedStatus = async () => {
			try {
				setIsLoading(true);
				const jwt = getCookie("jwt");

				const response = await fetch(
					`${process.env.NEXT_PUBLIC_APIBASE}/articles/status/pinned`,
					{
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
					}
				);

				if (response.ok) {
					const pinnedArticles: PinnedArticle[] = await response.json();
					// Check if current article is in the pinned articles list
					const isPinnedArticle = pinnedArticles.some(
						(article) =>
							article.id === articleId && article.articleProgress?.pinned
					);
					setIsPinned(isPinnedArticle);
				} else {
					console.error("Error checking pinned status:", await response.text());
				}
			} catch (error) {
				console.error("Error fetching pinned status:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkPinnedStatus();
	}, [articleId]);

	return (
		<Flex align={"center"} width={"30px"}>
			<Tooltip
				content={
					isPinned ? "Remove from pinned articles" : "Add to my pinned articles"
				}
			>
				{isLoading ? (
					<div className="animate-pulse w-5 h-5" />
				) : isPinned ? (
					<FaBookmark
						className="pl-1 cursor-pointer text-maestro"
						onClick={() => togglePinned(false)}
					/>
				) : (
					<CiBookmark
						size="22"
						className="cursor-pointer"
						onClick={() => togglePinned(true)}
					/>
				)}
			</Tooltip>
		</Flex>
	);
};

export default PinArticleButton;
