import {
	Flex,
	Heading,
	Grid,
	Button,
	Box,
	Card,
	Separator,
	Text,
} from "@radix-ui/themes";
import CompetencyModal from "./_components/CompetencyModal";
import CompetencyScoreBar from "./_components/CompetencyScoreBar";
import React from "react";
import Link from "next/link";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import Skillbar from "./_components/Skillbar";

type tParams = Promise<{ slug: string[] }>;

const AssessmentPage = async (props: { params: tParams }) => {
	let id = await props.params;
	const [competencyList, assessment, jobTitleSkills] = await Promise.all([
		fetchApi(`/competencies`),
		fetchApi(`/my/assessments/`),
		fetchApi(`/job-title-skills`),
	]);

	// Fetch individual competencies with their skills
	const competencies = await Promise.all(
		competencyList.map(async (comp) => {
			const competency = await fetchApi(`/competencies/${comp.id}`);
			return competency;
		})
	);

	// Calculate averages for each competency
	const averages = competencies.map((competency) => {
		const competencySkills = competency.skills.map((skill) => skill.id);
		const relevantJobTitleSkills = jobTitleSkills.filter((jts) =>
			competencySkills.includes(jts.skillId)
		);
		const relevantAssessments = assessment.assessmentResults.filter((result) =>
			relevantJobTitleSkills.some((jts) => jts.id === result.jobTitleSkillId)
		);

		if (relevantAssessments.length === 0) return 0;
		const sum = relevantAssessments.reduce(
			(acc, curr) => acc + Number(curr.value),
			0
		);
		return Math.round(sum / relevantAssessments.length);
	});

	// Calculate expected (target) averages for each competency
	const expected = competencies.map((competency) => {
		const competencySkills = competency.skills.map((skill) => skill.id);
		const relevantJobTitleSkills = jobTitleSkills.filter((jts) =>
			competencySkills.includes(jts.skillId)
		);

		if (relevantJobTitleSkills.length === 0) return 0;
		const sum = relevantJobTitleSkills.reduce(
			(acc, curr) => acc + Number(curr.target),
			0
		);
		return Math.round(sum / relevantJobTitleSkills.length);
	});

	const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];
	return (
		<Flex direction="column" p="5">
			{!assessment ||
			!assessment.assessmentResults ||
			assessment.assessmentResults.length === 0 ? (
				<Flex justify={"center"} align={"center"} mt="9">
					<Card className="shadow-lg">
						<Box p={{ initial: "4", md: "7" }}>
							<Heading size="4">
								You haven't yet submitted any assessment so far
							</Heading>
							<Separator my="3" size="4" />
							<Text>
								Take some time in order to assess your knowledge and skill
								level.{" "}
							</Text>
							<Flex mt="5">
								<Link href="/my/assessments/new">
									<Button>Take your first assessment</Button>
								</Link>
							</Flex>
						</Box>
					</Card>
				</Flex>
			) : (
				<Flex direction={"column"}>
					<Flex mb="5" justify="between">
						<Heading>My latest assessment result</Heading>
					</Flex>
					<Grid columns={{ initial: "1", md: "4" }} gap="3">
						{competencies.map((competency: Competency, index: number) => (
							<CompetencyModal
								key={competency.id}
								color={colors[index]}
								params={{
									id: competency.id,
								}}
								assessmentResults={assessment.assessmentResults}
							/>
						))}
					</Grid>

					<Flex>
						<Heading mt="5" mb="3">
							My Progress
						</Heading>
					</Flex>
					{/* {competencies.map((competency: Competency, index: number) => (
						<Grid
							key={competency.id}
							columns={{ initial: "1", md: "5" }}
							gap="6"
							align="center"
							mb="3"
						>
							<Box className="lg:col-span-2">
								<Heading as="h4" weight="light" color="gold">
									{competency.name}
								</Heading>
							</Box>
							<Box className="lg:col-span-3">
								<div className="flex flex-col border-b-2 max-w-100">
									<Skillbar result={averages[index]} color="lightgray" />
									<Skillbar result={expected[index]} color="#F87171" />
								</div>
							</Box>
						</Grid>
					))} */}
					<Flex direction={"column"} gap={"3"}>
						{competencies.map((competency: Competency, index: number) => (
							<Grid
								key={competency.id}
								columns={{ initial: "1", md: "5" }}
								gap="6"
								align="center"
								mb="3"
							>
								<Box className="lg:col-span-2">
									<Heading as="h4" weight="light" color="gold">
										{competency.name}
									</Heading>
								</Box>
								<CompetencyScoreBar
									currentLevel={averages[index]}
									averageLevel={expected[index]}
								/>
							</Grid>
						))}
					</Flex>
					<Flex direction={"row"} gap={"3"} justify={"end"} align={"center"}>
						<Flex direction={"row"} gap={"2"}>
							<Heading size="2" weight={"light"}>
								Current level
							</Heading>
							{/* Current Level dot */}
							<Box
								width="16px"
								height="16px"
								style={{
									backgroundColor: "#2B4C7E",
									borderRadius: "50%",
								}}
							/>
						</Flex>

						<Flex direction={"row"} gap={"2"}>
							<Heading size="2" weight={"light"}>
								Target level
							</Heading>
							{/* Average Level dot */}
							<Box
								width="16px"
								height="16px"
								style={{
									backgroundColor: "#C5A572",
									borderRadius: "50%",
								}}
							/>
						</Flex>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default AssessmentPage;
