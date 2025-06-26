import { Flex, Container, Box, Text, Grid, Heading } from "@radix-ui/themes";
import React from "react";

const FeaturesLibrary = () => {
	return (
		<Flex className="bg-maestro p-5 my-5">
			<Container>
				<Grid columns={{ initial: "1", md: "3" }}>
					<Flex
						justify="center"
						direction="column"
						className="align-middle md:col-span-2 sm:col-span-1 order-2 md:order-1"
						maxWidth={{ initial: "350px", md: "100%" }}
					>
						<Heading weight="light" mb="2">
							Library
						</Heading>
						<Text className="readable">
							Visit the Library page to explore the learning materials available
							on the platform. Utilize the filters to quickly find what you need
							and save your favorite documents so you can easily find them later
							when you have time.
						</Text>
					</Flex>
					<Box className="col-span-1 order-1 md:order-2">
						<img
							alt="screenshot"
							src="./help-2.png"
							width={"100%"}
							height={"auto"}
							className="max-w-[300px]"
						/>
					</Box>
				</Grid>
			</Container>
		</Flex>
	);
};

export default FeaturesLibrary;
