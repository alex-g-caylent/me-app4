import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiRobot3Line } from "react-icons/ri";

const Message = ({ message, user }: { message: Message; user: boolean }) => {
	let formattedMessage = [];
	formattedMessage.push(message.text.split("\n"));
	return (
		<Flex
			direction={"column"}
			className={
				user
					? "bg-slate-50 rounded-2xl hover:shadow-md duration-150 hover:translate-y-[-2px] border-slate-100 border-2 mr-3"
					: "bg-white border-slate-200 border-[1px] rounded-3xl my-3 mr-3"
			}
		>
			<Flex
				p="4"
				pl="6"
				gap="4"
				align="center"
				justify={"start"}
				direction={user ? "row" : "row-reverse"}
			>
				<Box width={"50px"}>
					{user ? <RiRobot3Line size="20" /> : <FaUser size="20" />}
				</Box>
				<Flex direction={"column"} align={user ? "start" : "end"}>
					{formattedMessage[0].map((message) => (
						<Text as="p" style={{ lineHeight: "2em" }} key={message}>
							{message}
						</Text>
					))}
				</Flex>
			</Flex>
			{message.citations.length > 0 && (
				<Flex direction={"column"} px="5" mb="2">
					<Separator size="4" my="3" />
					<Flex>
						{message.citations.map(
							(citation) =>
								citation.references.length > 0 && (
									<Flex
										key={citation.id.toString()}
										gap="2"
										pb="3"
										pl="5"
										direction={"column"}
										align="center"
									>
										<Flex>
											<Box width={"30px"} m="2">
												<IoDocumentTextOutline size="24" color="bbb" />
											</Box>
											<Flex direction={"column"}>
												<Link
													className="underline mt-2"
													href={`/my/articles/${citation.references[0]?.article?.id}`}
												>
													<Text size="2" weight={"medium"}>
														{citation.references[0]?.article?.title}
													</Text>
												</Link>
											</Flex>
										</Flex>
									</Flex>
								)
						)}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default Message;
