import { Container, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import React from "react";

const LoadingHelp = () => {
	return (
		<Container py="40px">
			<Flex direction="column" className="mt-[15px]" gap="1">
				<Heading weight="light">About Maestro</Heading>
				<Heading size="4" weight="light" color="gray" mb="3">
					Loading help page
				</Heading>
				<Flex justify="center">
					<Spinner size="3" />
				</Flex>
			</Flex>
		</Container>
	);
};

export default LoadingHelp;
