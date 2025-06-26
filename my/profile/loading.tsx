import {
	Container,
	Grid,
	Flex,
	Avatar,
	Heading,
	Text,
	DataList,
	Card,
	Box,
	Badge,
	Separator,
	Skeleton,
	Spinner,
} from "@radix-ui/themes";
import React from "react";

const LoadingMyProfile = () => {
	return (
		<Container className="my-[50px]">
			<Flex justify={"between"}>
				<Flex align="center" gap="5">
					<Flex justify={"between"} mt="5">
						<Flex>
							<Skeleton width={"150px"} height={"150px"} />
						</Flex>
					</Flex>
					<Flex direction={"column"} gap={"3"}>
						<Heading>My Profile</Heading>
						<Flex align={"center"} gap="3">
							<Text>Welcome to your page profile, dear</Text>
							<Spinner size="2" />
						</Flex>
					</Flex>
				</Flex>
				<Flex>
					<Card className="w-[100%]">
						<Box p="4">
							<DataList.Root>
								<DataList.Item>
									<DataList.Label minWidth="88px">Name</DataList.Label>
									<DataList.Value></DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">Email</DataList.Label>
									<DataList.Value>
										<Text></Text>
									</DataList.Value>
								</DataList.Item>
								<DataList.Label>Roles</DataList.Label>
								<Flex>
									<DataList.Item>
										<Flex gap="2"></Flex>
									</DataList.Item>
								</Flex>
								<DataList.Item>
									<DataList.Label>Business Unit</DataList.Label>
									<DataList.Value></DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>Region</DataList.Label>
									<DataList.Value></DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>Language</DataList.Label>
									<DataList.Value>
										<Skeleton width={"100%"} height={"30px"}></Skeleton>
									</DataList.Value>
								</DataList.Item>
							</DataList.Root>
						</Box>
					</Card>
				</Flex>
			</Flex>
			<Separator my="5" size="4" />
			<Grid columns={"2"}>
				<Flex direction={"column"}>
					<Heading size="4">Assessements</Heading>
				</Flex>
				<Flex direction={"column"}>
					<Heading size="4">Articles</Heading>
					<Text>Here you can find the articles you bookmarked</Text>
				</Flex>
			</Grid>
		</Container>
	);
};

export default LoadingMyProfile;
