import { Flex, Container, Grid, Box, Heading, Text } from "@radix-ui/themes";
import React from "react";

const FeaturesChatMaestro = () => {
	return (
		<Flex className="bg-maestro p-5 my-5">
			<Container>
				<Grid columns={{ initial: "1", md: "3" }}>
					<Box className="col-span-1" p="3" mr="5">
						<img
							alt="screenshot"
							src="./help-1.png"
							width={"100%"}
							height={"auto"}
							className="max-w-[300px]"
						/>
					</Box>
					<Flex
						justify="center"
						direction="column"
						className="align-middle md:col-span-2 sm:col-span-1"
						maxWidth={{ initial: "350px", md: "100%" }}
					>
						<Heading weight="light" mb="2">
							ChatMaestro
						</Heading>
						<Text className="readable">
							One of Maestro&apos;s standout features is ChatMaestro, an
							AI-driven assistant available directly within the platform, which
							provides instant, contextual answers to user queries, doubts and
							requests. This feature promotes an interactive learning
							environment, allowing you to engage with content actively and
							receive immediate support.
						</Text>
					</Flex>
				</Grid>
			</Container>
		</Flex>
	);
};

export default FeaturesChatMaestro;
