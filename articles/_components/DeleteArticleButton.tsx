"use client";
import { Button } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
	articleId: string;
}

const DeleteArticleButton = ({ articleId }: Props) => {
	const router = useRouter();
	const jwt = getCookie("jwt");
	console.log(articleId);
	const deleteArticle = (articleId: string) => {
		fetch(`${process.env.NEXT_PUBLIC_APIBASE}/articles/${articleId}`),
			{
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + jwt,
				},
				method: "DELETE",
			};
		router.push("/articles");
	};
	return (
		<Button onClick={() => deleteArticle(articleId)} className="min-w-[100px]">
			Delete article
		</Button>
	);
};

export default DeleteArticleButton;
