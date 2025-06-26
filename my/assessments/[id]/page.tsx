import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Heading, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import SkillChart from "../_components/SkillChart";

interface PageProps {
	params: {
		id: string;
	};
}

const AssessmentDetailsPage = async ({ params }: PageProps) => {
	const assessment = await fetchApi(`/assessments/${params.id}`);

	return (
		<Flex direction="column" gap="6" p="4">
			<Heading size="5" mb="4">
				Assessment Details
			</Heading>

			<Card>
				<Flex direction="column" gap="4" p="4">
					<Heading size="3">{assessment.name}</Heading>
					<Text as="p" color="gray" weight="light" mb="6">
						Created on {new Date(assessment.createdAt).toLocaleDateString()}
					</Text>

					<Heading size="2" mb="2">
						Skill Assessment
					</Heading>
					<Flex
						mb="2"
						align="center"
						justify="between"
						style={{ maxWidth: "700px" }}
					>
						<Text as="p" weight="medium">
							Skills
						</Text>
						<Flex gap="6">
							<Text as="p" weight="medium" size="2">
								0
							</Text>
							<Text as="p" weight="medium" size="2">
								1
							</Text>
							<Text as="p" weight="medium" size="2">
								2
							</Text>
							<Text as="p" weight="medium" size="2">
								3
							</Text>
							<Text as="p" weight="medium" size="2">
								4
							</Text>
						</Flex>
					</Flex>

					<SkillChart assessment={assessment} />

					<Flex mt="4" gap="4">
						<Flex align="center" gap="2">
							<Flex
								width="16px"
								height="16px"
								className="rounded-full"
								style={{ backgroundColor: "#0f5893" }}
							/>
							<Text size="1">Current Level</Text>
						</Flex>
						<Flex align="center" gap="2">
							<Flex
								width="16px"
								height="16px"
								className="rounded-full"
								style={{ backgroundColor: "#94a3b8" }}
							/>
							<Text size="1">Target Level</Text>
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};

export default AssessmentDetailsPage;
