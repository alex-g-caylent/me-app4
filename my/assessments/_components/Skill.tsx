import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Grid, Flex, Text, Tooltip, Heading, Card } from "@radix-ui/themes";
import React from "react";
import SkillChart from "./SkillChart";

interface Props {
	params: {
		id: string;
	};
	assessmentResults: any[];
}

const Skill = async ({ params, assessmentResults }: Props) => {
	const competencyId = params.id;

	// Fetch competencies to get skills and names
	const competencies = await fetchApi("/competencies");

	// Find the specific competency we want to display
	const currentCompetency = competencies.find(
		(comp: any) => comp.id === competencyId
	);

	if (!currentCompetency) {
		return (
			<Card>
				<Flex p="4">
					<Text>Competency not found</Text>
				</Flex>
			</Card>
		);
	}

	// Create a map of competency for easy lookup
	const competencyMap: Record<string, any> = {
		[currentCompetency.id]: currentCompetency,
	};

	// Create a map of skills from the current competency
	const skillMap: Record<string, any> = {};
	if (currentCompetency.skills && Array.isArray(currentCompetency.skills)) {
		currentCompetency.skills.forEach((skill: any) => {
			skillMap[skill.id] = {
				...skill,
				competency: {
					id: currentCompetency.id,
					name: currentCompetency.name,
				},
			};
		});
	}

	// Filter assessment results to only include skills from the current competency
	const filteredResults = assessmentResults.filter((result) => {
		const skill = result.jobTitleSkill?.skill;
		return skill && skill.competencyId === competencyId;
	});

	// Calculate average for the competency
	let competencyAverage = 0;
	if (filteredResults.length > 0) {
		const sum = filteredResults.reduce((acc, result) => acc + result.value, 0);
		competencyAverage = sum / filteredResults.length;
	}

	// Prepare assessment data for SkillChart
	const formattedAssessment = {
		id: competencyId,
		name: currentCompetency.name,
		assessmentResults: filteredResults.map((result) => {
			// Find the job title skill that matches this result
			const jobTitleSkill = result.jobTitleSkill;

			// Enhance the skill with competency information
			if (
				jobTitleSkill &&
				jobTitleSkill.skill &&
				skillMap[jobTitleSkill.skill.id]
			) {
				// Add competency information from our map
				jobTitleSkill.skill.competency = {
					id: currentCompetency.id,
					name: currentCompetency.name,
				};

				// Add the average for this competency
				jobTitleSkill.competencyAverage = competencyAverage;
			}

			return result;
		}),
	};

	return (
		<Card>
			<Flex direction="column" gap="4" p="4" width="100%">
				<Heading size="3">{currentCompetency.name}</Heading>

				<Grid columns="2" gap="3" mb="2">
					<Text as="p" weight="medium">
						Skills
					</Text>
					<Flex justify="between" style={{ width: "100%" }}>
						{[0, 1, 2, 3, 4].map((value) => (
							<Text
								key={value}
								as="p"
								weight="medium"
								size="2"
								style={{ width: "20px", textAlign: "center" }}
							>
								{value}
							</Text>
						))}
					</Flex>
				</Grid>

				<SkillChart assessment={formattedAssessment} />

				<Flex mt="4" gap="4">
					<Flex align="center" gap="2">
						<Flex
							width="16px"
							height="16px"
							className="rounded-full"
							style={{ backgroundColor: "#dc2626" }}
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
					<Flex align="center" gap="2">
						<Flex
							width="2px"
							height="16px"
							style={{ backgroundColor: "#d4d4d8" }}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};

export default Skill;
