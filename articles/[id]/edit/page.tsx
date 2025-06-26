import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import EditArticleForm from "../../_components/EditArticleForm";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import { mockArticle } from "../../_data/mockData";
import { jobTitleSkills } from "@/app/utils/assessmentQuestions";

interface JobTitle {
	id: string;
	name: string;
}

interface Skill {
	id: string;
	name: string;
}

interface JobTitleSkill {
	id: string;
	jobTitle: JobTitle;
	skill: Skill;
}

const EditArticlePage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	// const article = mockArticle;

	// Comment out the API calls since we're using mock data
	const [
		article,
		educationalFrameworks,
		educationalMethodologies,
		medias,
		languages,
		sources,
		educationalTools,
		businessUnits,
		courses,
		regions,
		jobTitles,
		jobTitleSkills,
	] = await Promise.all([
		fetchApi("/articles/" + params.id),
		fetchApi("/educational-frameworks"),
		fetchApi("/educational-methodologies"),
		fetchApi("/media"),
		fetchApi("/languages"),
		fetchApi("/sources"),
		fetchApi("/educational-tools"),
		fetchApi("/business-units"),
		fetchApi("/courses"),
		fetchApi("/regions"),
		fetchApi("/job-titles"),
		fetchApi("/job-title-skills"),
	]);

	return (
		<Container my="5">
			<Flex direction="column" gap="4">
				<Heading>Edit Article</Heading>
				{/* <EditArticleForm
					article={article}
					educationalFrameworks={mockArticle.educationalFrameworks}
					educationalMethodologies={mockArticle.educationalMethodologies}
					educationalTools={mockArticle.educationalTools}
					sources={mockArticle.sources}
					medias={mockArticle.medias}
					languages={mockArticle.languages}
					businessUnits={mockArticle.businessUnits}
					courses={mockArticle.courses}
					regions={mockArticle.regions}
					jobTitleSkills={mockArticle.jobTitleSkills}
					jobTitles={mockArticle.jobTitles}
				/> */}
				<EditArticleForm
					article={article}
					educationalFrameworks={educationalFrameworks}
					educationalMethodologies={educationalMethodologies}
					educationalTools={educationalTools}
					sources={sources}
					medias={medias}
					languages={languages}
					businessUnits={businessUnits}
					courses={courses}
					regions={regions}
					jobTitleSkills={jobTitleSkills}
					jobTitles={jobTitles}
				/>
			</Flex>
		</Container>
	);
};

export default EditArticlePage;
