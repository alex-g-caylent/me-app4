import { Box, Card, Flex, Heading, Table, Tabs, Text } from "@radix-ui/themes";
import React from "react";

const ArticleRelevanceForJobTitleSkills = ({
	article,
	jobTitles,
	jobTitleSkills,
}: {
	article: Article;
	jobTitles: JobTitle[];
	jobTitleSkills: JobTitleSkill[];
}) => {
	return (
		<Flex>
			<Tabs.Root defaultValue="account">
				<Tabs.List>
					{jobTitles.map((jobTitle) => (
						<Tabs.Trigger value={jobTitle.id}>{jobTitle.name}</Tabs.Trigger>
					))}
				</Tabs.List>

				<Box pt="3" mb="5">
					{jobTitles.map((jobTitle) => (
						<Tabs.Content value={jobTitle.id}>
							<Flex
								justify={"start"}
								my="3"
								direction={"column"}
								align={"start"}
							>
								<Heading size="2" mb="2">
									Article relevance for {jobTitle.name}
								</Heading>
								<Table.Root>
									{jobTitleSkills.map(
										(jobTitleSkill) =>
											jobTitleSkill.jobTitle.id === jobTitle.id && (
												<Table.Row>
													<Table.Cell>{jobTitleSkill.skill.name}</Table.Cell>
													<Table.Cell>
														{article.articleJobTitleSkills.map(
															(articleJobTitleSkill) =>
																articleJobTitleSkill.jobTitleSkillId ===
																	jobTitleSkill.id &&
																articleJobTitleSkill.relevance
														)}
													</Table.Cell>
												</Table.Row>
											)
									)}
								</Table.Root>
							</Flex>
						</Tabs.Content>
					))}
				</Box>
			</Tabs.Root>
		</Flex>
	);
};

export default ArticleRelevanceForJobTitleSkills;
