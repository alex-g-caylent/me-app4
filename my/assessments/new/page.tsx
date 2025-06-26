import { Flex } from "@radix-ui/themes";
import React from "react";
import AssessmentForm from "../_components/AssessmentForm";
import { fetchApi } from "@/app/utils/fetchInterceptor";

const NewAssessment = async () => {
	const [jobTitleSkills, user] = await Promise.all([
		fetchApi("/job-title-skills"),
		fetchApi("/my/profile"),
		// fetchApi("/auth/user"),
	]);

	return (
		<Flex>
			<AssessmentForm jobTitleSkills={jobTitleSkills} user={user} />
		</Flex>
	);
};

export default NewAssessment;
