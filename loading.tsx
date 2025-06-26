import {
	Box,
	Flex,
	Heading,
	Text,
	Grid,
	Card,
	Skeleton,
} from "@radix-ui/themes";
import React from "react";

const LoadingHome = () => {
	return (
		<Flex direction={"column"} p="5">
			<Flex mb="3">
				<Box>
					<Heading>Main Library</Heading>
					<Text>Grouped by Competency</Text>
				</Box>
			</Flex>
			<Grid columns={{ initial: "2", sm: "4" }} gap="3" width="auto">
				<Skeleton height={"150px"} width={"100%"}></Skeleton>
				<Skeleton height={"150px"} width={"100%"}></Skeleton>
				<Skeleton height={"150px"} width={"100%"}></Skeleton>
				<Skeleton height={"150px"} width={"100%"}></Skeleton>
			</Grid>

			<Flex mt="5" mb="3">
				<Box>
					<Heading>Recommended for you</Heading>
					<Text>Grouped by Competency</Text>
				</Box>
			</Flex>
			<Grid columns={{ initial: "1", md: "4" }} gap="4">
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
			</Grid>
			<Flex mt="5" mb="3">
				<Box>
					<Heading>Top Related Learning Activities</Heading>
					<Text>What's trending</Text>
				</Box>
			</Flex>
			<Grid columns={{ initial: "1", md: "4" }} gap="4">
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
				<Skeleton height={"320px"} width={"100%"}></Skeleton>
			</Grid>
		</Flex>
	);
};

export default LoadingHome;
