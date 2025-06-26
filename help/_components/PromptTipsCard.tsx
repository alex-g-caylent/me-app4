import { Flex, Card, Heading, Text } from "@radix-ui/themes";
import React from "react";

const PromptTipsCard = ({
	title,
	content,
}: {
	title: string;
	content: string;
}) => {
	return (
		<Card className="bg-navbar">
			<Flex direction={"column"} gap="2" p="3">
				<Heading size="3">{title}</Heading>
				<Text>{content}</Text>
			</Flex>
		</Card>
	);
};

export default PromptTipsCard;
