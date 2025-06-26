import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LatestAssessment = () => {
	return (
		<Flex direction={"column"} gap="3">
			<Flex direction={"column"} gap="3">
				<Text mt="3">You already took an assessment. Check the results</Text>
				<Link href="/my/assessments">
					<Button variant="outline">Check your latest assessment</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default LatestAssessment;
