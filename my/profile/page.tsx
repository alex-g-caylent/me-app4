import { fetchApi } from "@/app/utils/fetchInterceptor";
import {
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
	Button,
} from "@radix-ui/themes";
import React from "react";
import UserAvatar from "./_components/UserAvatar";
import UserDetailsCard from "./_components/UserDetailsCard";
import { getCookie } from "cookies-next";
import Link from "next/link";

export const dynamic = "force-dynamic";

const MyProfile = async () => {
	try {
		const jwt = await getCookie("jwt");
		const [user] = await Promise.all([fetchApi(`/my/profile`)]);
		// const [user] = await Promise.all([fetchApi(`/auth/user`)]);

		const queryAssessment = await fetch(
			`${process.env.NEXT_PUBLIC_APIBASE}/my/assessments`,
			{
				headers: {
					Authorization: "Bearer " + jwt,
					accept: "*/*",
				},
				method: "GET",
			}
		);

		const latestAssessment = await queryAssessment.json();

		console.log("Query assessment: ", queryAssessment);
		console.log("Latest assessment: ", latestAssessment);

		// Safely handle roles
		const roles = [""];
		if (user?.roleUsers?.length > 0) {
			user.roleUsers.forEach((role: { role?: { name?: string } }) => {
				if (role?.role?.name) {
					roles.push(role.role.name);
				}
			});
			roles.shift();
		}

		// If user data is missing critical fields, throw an error
		if (!user || typeof user !== "object") {
			throw new Error("Invalid user data received from API");
		}

		return (
			<Container className="sm:my-[50px]" p={{ initial: "3", sm: "0" }}>
				<Flex justify={"between"} direction={{ initial: "column", sm: "row" }}>
					{/* Pass safe user object to components */}
					<UserAvatar
						user={{
							...user,
							roleUsers: user.roleUsers || [],
							// Add any other required fields with fallbacks
						}}
						message={"Welcome to your profile, dear "}
					/>
					<UserDetailsCard
						user={{
							...user,
							roleUsers: user.roleUsers || [],
							// Add any other required fields with fallbacks
						}}
					/>
				</Flex>
				<Separator my="5" size="4" />
				<Grid columns={{ initial: "1", sm: "2" }} gap="5">
					<Flex direction={"column"}>
						<Heading size="4">Assessements</Heading>
						<Flex direction="column" gap="3">
							<Link href="/my/assessments/new">
								<Button size="3">Take a new assessment</Button>
							</Link>
							<Separator my="2" size="4" />
							<Flex direction="column" gap="2">
								<Text weight="medium" size="2">
									Latest assessment:
								</Text>
								{!latestAssessment ? (
									<Text size="2" color="gray">
										No assessments yet
									</Text>
								) : (
									<Link href="/my/assessments">
										{/* <Flex direction="column" gap="1">
											<Text size="2" color="blue" weight="medium">
												{latestAssessment.name}
											</Text>
											<Text size="1" color="gray">
												{new Date(
													latestAssessment.createdAt
												).toLocaleDateString("en-GB", {
													day: "2-digit",
													month: "2-digit",
													year: "numeric",
												})}
											</Text>
										</Flex> */}
										<Button variant="outline">
											Check your latest assessment
										</Button>
									</Link>
								)}
							</Flex>
						</Flex>
					</Flex>
				</Grid>
			</Container>
		);
	} catch (error) {
		console.error("Error in MyProfile:", error);
		return (
			<Container p="4">
				<Flex direction="column" gap="3">
					<Heading color="red">Error Loading Profile</Heading>
					<Text>
						There was an error loading your profile. Please try refreshing the
						page.
					</Text>
					{error instanceof Error && (
						<Text size="2" color="gray">
							{error.message}
						</Text>
					)}
				</Flex>
			</Container>
		);
	}
};

export default MyProfile;
//this is just a comment
