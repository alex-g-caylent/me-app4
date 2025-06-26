"use client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const error = ({}) => {
	return (
		<Flex justify={"center"} align={"center"} className="mt-[200px]">
			<Card className="shadow-lg">
				<Flex p="5" direction={"column"} gap="2" align={"center"}>
					<Heading>An error occurred</Heading>
					<Text>Unfortunately, something went wrong with your request.</Text>
				</Flex>
			</Card>
		</Flex>
	);
};

export default error;
