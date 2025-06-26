import { Flex, Text, Link, Button } from "@radix-ui/themes";
import React from "react";

const TakeNewAssessment = () => {
	return (
		<Flex direction={"column"} gap="2" mt="3">
			<Text>There are no assessments. Take your first quiz</Text>
			<Link href="/my/assessments/new">
				<Button>Take a new assessment</Button>
			</Link>
		</Flex>
	);
};

export default TakeNewAssessment;
