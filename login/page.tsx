import {
	AspectRatio,
	Box,
	Card,
	Flex,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React, { Suspense } from "react";
import LoginButton from "./_components/LoginButton";

const LoginPage = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<Flex
			justify="center"
			className="md:pt-[130px]"
			direction={{ initial: "column", md: "row" }}
		>
			<Flex minWidth="400px" className="shadow-md">
				<Suspense>
					<AspectRatio ratio={16 / 9}>
						<img
							src="/login.jpg"
							alt="Edwards login"
							style={{
								objectFit: "cover",
								width: "100%",
								height: "100%",
								borderRadius: "var(--radius-5)",
							}}
						/>
					</AspectRatio>
				</Suspense>
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
							<Suspense>
								<LoginButton />
							</Suspense>
						</Box>
					</Card>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoginPage;
