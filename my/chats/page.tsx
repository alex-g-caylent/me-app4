import React, { Suspense } from "react";
import Sidebar from "./_components/Sidebar";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import NewChat from "./_components/NewChat";
import MobileChatsMenu from "./_components/MobileChatsMenu";
import SuggestedPrompt from "./_components/SuggestedPrompt";

const Chatbox = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<>
			<Flex height={"80vh"} overflowX={"hidden"}>
				<Sidebar />
				<Flex id="chatArea" align="center" height="100%">
					<Flex
						direction="column"
						justify="between"
						style={{
							backgroundImage: "url(/bgchat.jpg)",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
						height={"100%"}
					>
						<Flex position={"absolute"} top="120px" right={"5"}>
							<MobileChatsMenu />
						</Flex>
						<Flex
							direction="column"
							overflow={"hidden"}
							gap="2"
							justify={"center"}
							align={"center"}
							px={{ initial: "0", md: "5" }}
							mt={{ initial: "10px", md: "150px" }}
							minWidth={{ initial: "100%", md: "80vw" }}
						>
							<Heading
								as="h1"
								size="8"
								weight="light"
								mt={{ initial: "5", md: "0" }}
							>
								Maestro
							</Heading>
							<Heading as="h3" size="4" weight="light">
								From curiosity to knowledge
							</Heading>
							<Flex mt="3" direction="column" justify="between" mx="5">
								<Heading as="h3" size="3" weight="light">
									Suggested tasks
								</Heading>
								<Suspense>
									<Flex
										direction={{ initial: "column", lg: "row" }}
										mt="3"
										gap="3"
										justify="center"
									>
										<SuggestedPrompt
											promptIcon="questionmark"
											promptTitle={"Anticoagulation and valves"}
											prompt={
												"Is anticoagulation useful for non mechanical implanted valves?"
											}
										/>
										<SuggestedPrompt
											promptIcon="gamepad"
											promptTitle={"Questions about mitris"}
											prompt={
												"⁠I need three question with mutiple choice answer for designing a test about mitris"
											}
										/>
										<SuggestedPrompt
											promptIcon="magic"
											promptTitle={"Learn how to handle objections"}
											prompt={
												"How to handle objections about resilia price?. Give me insights and strategy about"
											}
										/>
									</Flex>
								</Suspense>
							</Flex>
						</Flex>

						<Flex direction="column" mb="5" px="5">
							<NewChat />
							<Text size="1" mt="2" align="center">
								Maestro can make mistakes. Check important info.
							</Text>
						</Flex>
						<Flex display={{ initial: "flex", md: "none" }}>
							<Separator size="4" my="3" />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default Chatbox;
