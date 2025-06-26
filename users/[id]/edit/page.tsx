import React from "react";
import UserForm from "../../_components/UserForm";
import { Container, Flex, Heading } from "@radix-ui/themes";
import { notFound, useSearchParams } from "next/navigation";
import { fetchApi } from "@/app/utils/fetchInterceptor";

const EditUserPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	let id = params.id;
	const [
		user,
		businessUnits,
		languages,
		regions,
		jobTitles,
		roles,
	] = await Promise.all([
		fetchApi(`/users/${id}`),
		fetchApi(`/business-units/`),
		fetchApi(`/languages/`),
		fetchApi(`/regions/`),
		fetchApi(`/job-titles/`),
		fetchApi(`/roles/`),
	]);

	if (!user) notFound();

	return (
		<Container className="my-[40px] max-w-[600px] mx-auto border-[1px] shadow-md">
			<Flex direction="column" p="5">
				<Heading mb="5">
					Edit user {user ? user.firstName : "no name found"}
				</Heading>
				<UserForm
					user={user}
					roles={roles}
					businessUnits={businessUnits}
					languages={languages}
					regions={regions}
					jobTitles={jobTitles}
				/>
			</Flex>
		</Container>
	);
};

export default EditUserPage;
