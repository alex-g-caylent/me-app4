import { Container, Flex, Heading, Spinner } from "@radix-ui/themes";
import React from "react";

const LoadingLogout = () => {
	return (
		<Container
			py={{ initial: "2", md: "9" }}
			px="4"
			pt="200px"
			maxWidth={"600px"}
		>
			<Spinner size="3" />
			<Flex direction="column" pt="3">
				<Heading>Logging you out of Maestro</Heading>
			</Flex>
		</Container>
	);
};

export default LoadingLogout;
