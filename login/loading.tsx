import {
	Flex,
	Card,
	Box,
	Heading,
	Separator,
	Text,
	Skeleton,
	Spinner,
} from "@radix-ui/themes";
import React, { Suspense } from "react";
import LoginButton from "./_components/LoginButton";

const LoadingLogin = () => {
	return (
		<Flex
			justify="center"
			className="md:pt-[130px]"
			direction={{ initial: "column", md: "row" }}
		>
			<Flex minWidth="400px" className="shadow-md">
				<Skeleton width={"100%"} height={"100%"}></Skeleton>
			</Flex>
			<Flex p="5" align="center" gap="5">
				<Flex direction="column" gap="2">
					<Card className="shadow-lg">
						<Box px="5" className="py-[50px]">
							<Heading mb="3" weight="medium">
								Start using Maestro
							</Heading>
							<Text>
								Time to join the revolution in onboarding and training
							</Text>
							<Separator my="4" size="4" />
							<Spinner size="3" />
						</Box>
					</Card>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoadingLogin;
