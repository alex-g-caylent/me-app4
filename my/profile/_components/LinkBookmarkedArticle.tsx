"use client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

const LinkBookmarkedArticle = ({ article }: { article: Article }) => {
	return (
		<Link
			href={`/articles/${article.id}`}
			className="w-[100%] border-[1px] hover:bg-slate-100 duration-200 mb-2 rounded-full"
		>
			<Flex p="2">
				<HiOutlineDocumentDuplicate size="20" />
				<Text size="2" className="pl-2">
					{article.title}
				</Text>
			</Flex>
		</Link>
	);
};

export default LinkBookmarkedArticle;
