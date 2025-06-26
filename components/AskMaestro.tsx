"use client";

import { ArrowUpIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { Formik, Form, Field } from "formik";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { startNewChat } from "../utils/api/chats";
import { FaArrowCircleUp } from "react-icons/fa";

const AskMaestro = () => {
	const router = useRouter();
	const pathname = usePathname();
	const blockedRoutes = ["/my/chats", "/login", "/logout"];

	const isBlockedRoute = () => {
		let result = false;
		if (!blockedRoutes.indexOf(pathname)) {
			result = true;
		}
		console.log(result);
		return result;
	};

	const onSubmit = useCallback(async ({ name: prompt }: { name: string }) => {
		const chat = await startNewChat(prompt);

		if (chat?.id) {
			router.push(`/my/chats/${chat?.id}`);
		}
	}, []);

	return (
		<Flex mb="3" px="3">
			<Formik
				initialValues={{
					name: "",
				}}
				onSubmit={onSubmit}
			>
				<Form className="w-[100%]">
					<Flex
						className="w-[100%] chatbot shadow-md"
						align={"center"}
						style={{ width: "100%" }}
					>
						<HiOutlineDocumentSearch size="30" color="aaa" />
						<Field
							name="name"
							id="prompt"
							className="w-[100%] chatbot border-none"
							style={{ width: "100%" }}
							autoFocus="true"
							placeholder="Ask me something"
						/>
						<Button variant={"ghost"} color="gray">
							<FaArrowCircleUp size="24" />
						</Button>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default AskMaestro;
