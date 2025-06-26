import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import FAQItem from "./FAQItem";

const faqData = [
	{
		question: "What is Maestro?",
		answer:
			"Maestro is a learning platform powered by Artificial Intelligence that offers an engaging learning experience to upskill yourself.",
	},
	{
		question: "Why should I use Maestro?",
		answer:
			"Maestro is a versatile tool designed to enhance productivity and learning in various ways. \n - To assess your competencies. \n - To upskill yourself. \n - To find accurate and fast answers to your needs. \n - To transform your curiosity into knowledge. \n - … and much more!",
	},
	{
		question:
			"When will the material of the other competencies be integrated in Maestro?",
		answer:
			"At the moment, the content present in Maestro only refers to Clinical & Product Knowledge. The material of the other competencies (Market & Business Expertise, Operational Excellence & Selling Skills) will be integrated in the next months.",
	},
	{
		question: "Can I use Maestro on a mobile device?",
		answer:
			"Yes, Maestro is designed to be responsive and works across devices, and it is easily accessible via browser.",
	},
	{
		question: "How do I save content for future reference?",
		answer:
			'You can save content by mark content as "Saved" by clicking on the bookmark next to the article and access it in the Library section whenever you want. within the Library section for easy access later',
	},
	{
		question: "How does ChatMaestro work?",
		answer:
			"ChatMaestro is an integrated AI chatbot that provides instant assistance. Start a conversation by typing your question in the floating chat bar, available on the Home, Profile, and Help pages. Refer to the “Prompt Engineering” section to learn more about prompt engineering.",
	},
	{
		question: "How can I assess my competencies?",
		answer:
			"ChatMaestro is an integrated AI chatbot that provides instant assistance. Start a conversation by typing your question in the floating chat bar, available on the Home, Profile, and Help pages. Refer to the “Prompt Engineering” section to learn more about prompt engineering.",
	},
	{
		question: "How does ChatMaestro work?",
		answer:
			"In My Profile Page, click on “Take new assessment” to assess your competencies and skills. If you have already took it in the last 12 months, access your previous assessment by clicking on “Check your assessment”",
	},
];

const FAQ = () => {
	return (
		<Flex
			direction="column"
			className="mt-[50px] mb-[80px] max-w-[1100px] mx-auto"
			gap="5"
			p="3"
		>
			<Flex direction="column">
				<Flex direction="column" mb="4">
					<Heading weight="light" mb="2">
						Frequently Asked Questions
					</Heading>
					<Heading weight="light" color="gray" size="4" mb="5">
						How you can use Maestro in your day-to-day job
					</Heading>
				</Flex>
				<Flex direction="column" gap="4">
					{faqData.map((faq, index) => (
						<FAQItem
							key={index}
							question={faq.question}
							answer={faq.answer}
							index={index + 1}
							variant={index % 2 === 0 ? "default" : "bordered"}
						/>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FAQ;
