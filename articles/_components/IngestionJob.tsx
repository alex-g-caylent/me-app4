import SyncKnowledge from "@/app/articles/_components/SyncKnowledge";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Tooltip } from "@radix-ui/themes";
import React from "react";

const getLastIngestionJob = async () => {
	try {
		return await fetchApi("/chatbot/ingestion-jobs/last");
	} catch (error) {
		console.error("Error fetching ingestion job status", error);
		return {};
	}
};

const InjestionJob = async () => {
	const ingestionJob = await getLastIngestionJob();
	return (
		<Flex gap="2" px="3" py="2">
			<Flex align="center" gap="2">
				<Tooltip
					content="Status of the syncronization of Maestro's knowledgebase with the
        Vector DB"
				>
					<InfoCircledIcon />
				</Tooltip>
				{!ingestionJob.locked && (
					<Heading size="2" weight={"light"}>
						Knowledgebase syncronized
					</Heading>
				)}
			</Flex>

			<SyncKnowledge ingestionJob={ingestionJob} />
		</Flex>
	);
};

export default InjestionJob;
