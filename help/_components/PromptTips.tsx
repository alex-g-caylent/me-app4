import { Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import PromptTipsCard from "./PromptTipsCard";

const PromptTips = () => {
	return (
		<Flex
			direction="column"
			gap="2"
			mt="5"
			p="3"
			className="max-w-[1100px] mx-auto"
		>
			<Grid columns={{ initial: "1", md: "3" }} gap="3">
				<PromptTipsCard
					title="Be Clear and Specific"
					content="Clearly state what you need: “List the main features of the Edwards SAPIEN 3 valve.”"
				/>
				<PromptTipsCard
					title="Give Context"
					content="Share what you already know, so the chatbot can skip basics and dive deeper."
				/>
				<PromptTipsCard
					title="Ask for the Format You Prefer"
					content="Request specific answer types: bullet points, numbered steps, or a concise summary: “Give me three key advantages of the Magna Ease valve in bullet points.”"
				/>
				<PromptTipsCard
					title="Use Follow-Up Questions"
					content="If the first answer isn’t what you expected, clarify or request more details!"
				/>
				<PromptTipsCard
					title="Double-Check for Accuracy"
					content="Always confirm important details with official Edwards Lifesciences resources linked in the responses or your colleagues."
				/>
				<PromptTipsCard
					title="Keep it Compliant"
					content="Avoid sharing personal patient data, and keep your inquiries general."
				/>
			</Grid>
			<Flex mt="5" mb="3" className="max-w-[800px]">
				<Text>
					Below are some examples of “poor” prompts (too vague or unstructured)
					alongside “improved” prompts (clear, specific, and context-rich), that
					will help you see how to craft more effective questions for
					ChatMaestro.
				</Text>
			</Flex>
		</Flex>
	);
};

export default PromptTips;
