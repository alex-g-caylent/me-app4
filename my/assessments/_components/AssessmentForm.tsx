"use client";
import {
	Button,
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
	Box,
	TextField,
} from "@radix-ui/themes";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { useRouter } from "next/navigation";
import assessmentQuestions from "@/app/utils/assessmentQuestions";
import { getCookie } from "cookies-next";
import { MdOutlineQuiz } from "react-icons/md";
import GoBack from "@/app/components/GoBack";
import { Spinner } from "@/app/components/Spinner";

type AssessmenTQuestionSet = {
	question: string;
	Answer_1: string;
};

interface Props {
	jobTitleSkills: JobTitleSkill[];
	user: User;
}

const AssessmentForm = ({ jobTitleSkills, user }: Props) => {
	const jwt = getCookie("jwt");
	const router = useRouter();
	let answer: { jobTitleSkillId: string; value: number } = {
		jobTitleSkillId: "",
		value: 0,
	};
	let quiz: { jobTitleSkillId: string; value: number }[] = [];
	let submitQuiz = { name: "", assessmentResults: quiz };
	return (
		<Container py="5">
			<Flex
				align={"center"}
				gap="4"
				className="bg-slate-100 pt-4 px-5 rounded-full shadow-xl"
				mb="7"
			>
				<MdOutlineQuiz size="60" className="pb-4" />
				<Flex direction={"column"} mb="5">
					<Text className="pb-2">
						You are taking the assessment for the job title:
					</Text>
					<Heading>{user.jobTitle.name}</Heading>
				</Flex>
			</Flex>
			<Formik
				initialValues={{
					name: "",
					assessmentResults: assessmentQuestions[0].jobTitleSkillIds.map(() => ({ value: "" })),
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string()
						.min(10, "Name must be at least 10 characters")
						.required("Name is required"),
					assessmentResults: Yup.array().of(
						Yup.object().shape({
							value: Yup.string().required("Please select an answer")
						})
					)
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						assessmentQuestions[0].jobTitleSkillIds.map((job, index) =>
							quiz.push({
								jobTitleSkillId: job.jobTitleSkillid,
								value: Number(values.assessmentResults[index].value),
							})
						);
						submitQuiz = { name: values.name, assessmentResults: quiz };
						
						const response = await fetch(process.env.NEXT_PUBLIC_APIBASE + "/my/assessments/", {
							headers: {
								Accept: "application/json",
								Authorization: "Bearer " + jwt,
								"Content-Type": "application/json",
							},
							method: "POST",
							body: JSON.stringify(submitQuiz),
						});
						
						if (!response.ok) {
							throw new Error('Failed to submit assessment');
						}
						
						router.push("/my/profile");
					} catch (error) {
						console.error('Error submitting assessment:', error);
						// You might want to show an error toast here
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form>
						<Flex direction="column" gap="3" mb="5">
							<Text as="label" size="2" weight="bold" htmlFor="name">
								Assign a name to this assessment
							</Text>
							<Field
								name="name"
								className={errors.name && touched.name ? "border-red-500 p-2 rounded-md w-full" : "p-2 rounded-md w-full border border-gray-300"}
								placeholder="Assessment name (min. 10 characters)"
							/>
							<ErrorMessage name="name">
								{msg => <Text color="red" size="1">{msg}</Text>}
							</ErrorMessage>
						</Flex>

						{assessmentQuestions[0].jobTitleSkillIds.map((job, index) => (
							<Box key={index} p="4">
								<Text weight="bold" mb="3">{job.Question}</Text>
								<Grid columns="4" gap="3">
									{[1, 2, 3, 4].map((value) => (
										<Box 
											key={value}
											p="3" 
											className="border-[1px] rounded-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-200 ease-in-out"
										>
											<label 
												htmlFor={`assessmentResults[${index}].value-${value}`}
												className="flex items-start gap-2 cursor-pointer"
											>
												<Field
													id={`assessmentResults[${index}].value-${value}`}
													name={`assessmentResults[${index}].value`}
													type="radio"
													value={value.toString()}
												/>
												<Flex direction="column" gap="2">
													<Separator size="4" />
													<Text size="2">{job[`Answer_${value}`]}</Text>
												</Flex>
											</label>
										</Box>
									))}
								</Grid>
								<ErrorMessage name={`assessmentResults[${index}].value`}>
									{msg => (
										<Text color="red" size="1" mt="2">
											{msg}
										</Text>
									)}
								</ErrorMessage>
							</Box>
						))}

						<Flex justify="end" gap="3" mt="5">
							<Button type="submit" disabled={isSubmitting} size="2">
								{isSubmitting ? (
									<Flex gap="2" align="center">
										<Spinner size="small" />
										<Text>Submitting...</Text>
									</Flex>
								) : (
									"Submit Assessment"
								)}
							</Button>
							<GoBack />
						</Flex>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default AssessmentForm;
