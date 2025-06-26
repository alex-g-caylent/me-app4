"use client";

import { askChatbot } from "@/app/utils/api/chats";
import { ClientError } from "@/app/utils/api/errors";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button, Flex, Spinner, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { toast } from "react-toastify";

interface Props {
	chatId: string;
}

const Chatbot = ({ chatId }: Props) => {
	const ref = useRef<HTMLFormElement>(null);
	const [submitting, setSubmitting] = useState(false);
	const jwt = getCookie("jwt");
	const router = useRouter();
	return (
		<Flex justify="between" width={"100%"} direction={"column"} mt="3">
			{submitting && (
				<Flex
					className="bg-green-200 rounded-full"
					height={"60px"}
					align={"center"}
					px="5"
					gap="3"
					my="3"
					display={submitting}
				>
					<Spinner size="3" />
					<Text>Interrogating the knowledge base...</Text>
				</Flex>
			)}

			<Formik
				initialValues={{
					prompt: "",
					chatId: chatId,
				}}
				onSubmit={async ({ prompt }) => {
					setSubmitting(true);
					ref.current?.reset();
					try {
						const answer = await askChatbot(chatId, prompt);
						if (answer?.chatId) {
							router.push(`/my/chats/${answer.chatId}`);
						}
					} catch (error) {
						if (error instanceof ClientError) {
							toast.error(`Question failed: ${error?.body?.message}`);
						}
					}
					setSubmitting(false);
				}}
			>
				<Form className="w-[100%]" style={{ width: "100%" }} ref={ref}>
					<Flex align="center" style={{ width: "100%" }}>
						<Flex direction="column" className="w-[100%]">
							<Flex
								className="w-[100%] chatbot"
								align={"center"}
								style={{ width: "100%" }}
							>
								<Field
									name="prompt"
									id="prompt"
									className="w-[100%] chatbot border-none"
									style={{ width: "100%" }}
									placeholder="Ask me something"
									disabled={submitting}
								/>
								<CheckCircledIcon
									width="30"
									height="30"
									className="text-gray-400"
								/>
							</Flex>
						</Flex>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default Chatbot;
