import { Grid, Flex, Text, Tooltip, Heading } from "@radix-ui/themes";
import React from "react";

interface Skill {
	id: string;
	name: string;
	competencyId: string;
	competency?: {
		id: string;
		name: string;
	};
}

interface JobTitleSkill {
	id: string;
	target: number;
	skill: Skill;
	competencyAverage?: number;
}

interface AssessmentResult {
	id: string;
	value: number;
	jobTitleSkillId: string;
	jobTitleSkill: JobTitleSkill;
}

interface Assessment {
	id: string;
	name: string;
	assessmentResults: AssessmentResult[];
}

interface SkillChartProps {
	assessment: Assessment;
}

const SkillChart: React.FC<SkillChartProps> = ({ assessment }) => {
	// Sort results by skill name
	const sortedResults = [...assessment.assessmentResults].sort((a, b) =>
		a.jobTitleSkill.skill.name.localeCompare(b.jobTitleSkill.skill.name)
	);

	// Find competency average (should be the same for all skills in this view)
	const competencyAverage =
		sortedResults.length > 0
			? sortedResults[0].jobTitleSkill.competencyAverage || 0
			: 0;

	return (
		<Flex direction="column" gap="2" width="100%">
			{sortedResults.map((result) => (
				<Grid key={result.id} columns="2" gap="3" align="center" mb="4">
					<Text as="p" weight="light" size="2">
						{result.jobTitleSkill.skill.name}
					</Text>

					<Flex position="relative" height="10px" align="center">
						{/* Scale line */}
						<Flex
							style={{
								backgroundColor: "#e4e4e7",
								height: "2px",
								width: "100%",
								position: "absolute",
							}}
						/>

						{/* Average marker for competency */}
						<Tooltip content={`Average: ${competencyAverage.toFixed(1)}`}>
							<Flex
								style={{
									position: "absolute",
									left: `${competencyAverage * 25}%`,
									height: "20px",
									width: "2px",
									backgroundColor: "#d4d4d8",
									transform: "translateX(-50%)",
								}}
							/>
						</Tooltip>

						{/* Target dot */}
						<Tooltip content={`Target: ${result.jobTitleSkill.target}`}>
							<Flex
								position="absolute"
								style={{
									backgroundColor: "#94a3b8",
									transform: "translateX(-50%)",
								}}
								width="16px"
								height="16px"
								className="rounded-full"
								left={`${result.jobTitleSkill.target * 25}%`}
							/>
						</Tooltip>

						{/* Result dot */}
						<Tooltip content={`Current: ${result.value}`}>
							<Flex
								position="absolute"
								style={{
									backgroundColor: "#dc2626",
									transform: "translateX(-50%)",
								}}
								width="16px"
								height="16px"
								className="rounded-full"
								left={`${result.value * 25}%`}
							/>
						</Tooltip>
					</Flex>
				</Grid>
			))}
		</Flex>
	);
};

export default SkillChart;
