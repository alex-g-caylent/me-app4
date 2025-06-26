import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const PromptIntro = () => {
	return (
		<Flex
			direction="column"
			gap="2"
			mt="8"
			p="3"
			className="max-w-[1100px] mx-auto"
		>
			<Heading weight={"light"}>Prompt Engineering</Heading>
			<Heading size="4" weight="light">
				How to ask ChatMaestro the right questions
			</Heading>
			<Text className="max-w-[800px] pt-2">
				Prompt engineering is the art of creating effective prompts to
				communicate with AI models. <br />A well-posed question can
				significantly improve the quality of ChatMaestro’s responses!
				<br />
				<br />
				Follow these simple steps to get the best out of ChatMaestro:
			</Text>
		</Flex>
	);
};

export default PromptIntro;
