import { Flex, Container, Grid, Box, Heading, Text } from "@radix-ui/themes";
import React from "react";

const FeaturesProfile = () => {
	return (
		<Flex className="bg-maestro p-5 my-5">
			<Container>
				<Grid columns={{ initial: "1", md: "3" }}>
					<Box className="col-span-1" py="5" p="3" mr="5">
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
							Profile
						</Heading>
						<Text className="readable">
							In your profile you’ll be able to test assess your level of
							proficiency in the 4 key competencies: Clinical & Product
							Knowledge, Market & Business Expertise, Operational Excellence and
							Selling Skills. Maestro will guide you through a personalized
							learning path and track your progress during time.
						</Text>
					</Flex>
				</Grid>
			</Container>
		</Flex>
	);
};

export default FeaturesProfile;
