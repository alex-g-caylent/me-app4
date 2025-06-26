import { Container, Flex } from "@radix-ui/themes";
import React from "react";
import UserForm from "../_components/UserForm";
import { fetchApi } from "@/app/utils/fetchInterceptor";

const NewUser = async () => {
	const [
		businessUnits,
		languages,
		regions,
		jobTitles,
		roles,
	] = await Promise.all([
		fetchApi("/business-units"),
		fetchApi("/languages"),
		fetchApi("/regions"),
		fetchApi("/job-titles"),
		fetchApi("/roles"),
	]);

	return (
		<Container className="my-[40px] max-w-[600px] mx-auto border-[1px] shadow-md p-5">
			<UserForm
				businessUnits={businessUnits}
				languages={languages}
				regions={regions}
				jobTitles={jobTitles}
				roles={roles}
			/>
		</Container>
	);
};

export default NewUser;
