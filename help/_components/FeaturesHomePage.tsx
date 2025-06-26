import { Flex, Container, Heading, Text, Box, Grid } from "@radix-ui/themes";
import React from "react";

const FeaturesHomePage = () => {
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
							Home Page
						</Heading>
						<Text className="readable">
							By using the power of AI,  Maestro personalizes learning content
							based on your specific role, competencies, and skills. This
							ensures that you receive targeted educational materials relevant
							to your job functions, making your learning more efficient and
							impactful.
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

export default FeaturesHomePage;
