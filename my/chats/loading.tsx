import {
	Grid,
	Flex,
	Heading,
	Box,
	Card,
	Text,
	Skeleton,
} from "@radix-ui/themes";
import React from "react";

const LoadingChats = () => {
	return (
		<Grid columns={{ initial: "1", md: "4" }}>
			<Skeleton width={"80%"} height={"100%"}></Skeleton>
			<Flex align="center" width="100%" height={"100%"} className="col-span-3">
				<Flex direction="column" justify="between" pt="100px">
					<Flex direction="column" gap="2">
						<Heading as="h1" size="8" weight="light" align="center">
							Maestro
						</Heading>
						<Heading as="h3" size="4" weight="light" align="center">
							From curiosity to knowledge
						</Heading>
					</Flex>
					<Flex mt="3" direction="column" justify="between" mx="5">
						<Heading as="h3" size="3" weight="light">
							Suggested tasks
						</Heading>
						<Grid width={"100%"} columns={{ initial: "1", md: "3" }} gap="4">
							<Skeleton width={"350px"} height={"150px"}></Skeleton>
							<Skeleton width={"350px"} height={"150px"}></Skeleton>
							<Skeleton width={"350px"} height={"150px"}></Skeleton>
						</Grid>
						<Flex className="mt-[250px]" direction="column">
							<Text size="1" mt="2" align="center">
								Maestro can make mistakes. Check important info.
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Grid>
	);
};

export default LoadingChats;
