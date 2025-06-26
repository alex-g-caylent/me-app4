"use client";
import { Badge, Button, Flex, Spinner } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SyncKnowledge = ({ ingestionJob }: { ingestionJob: IngestionJob }) => {
	const jwt = getCookie("jwt");
	const [submitting, setSubmitting] = useState(false);
	useEffect(() => {
		// console.log("ingestionJob", ingestionJob);
		if (!ingestionJob || Object.keys(ingestionJob).length === 0) {
			toast.error("Failed to fetch ingestion job status");
		}
	}, [ingestionJob]);

	const handleClick = async () => {
		try {
			if (!ingestionJob.locked) {
				// await fetchApi("/chatbot/knowledge-base/sync");
				await fetch(
					process.env.NEXT_PUBLIC_APIBASE + "/chatbot/knowledge-base/sync",
					{
						headers: {
							Accept: "application/json",
							Authorization: "Bearer " + jwt,
						},
						method: "POST",
					}
				);
				toast.success("Knowledge base sync started");
			}
		} catch (error) {
			toast.error("Failed to sync knowledge base");
		}
		setSubmitting(false);
	};

	return (
		<Flex justify={"center"}>
			{ingestionJob.locked || submitting ? (
				<Flex align={"center"} gap="2">
					<Spinner size={"3"} />
					<Badge size="3" color="orange" className="text-center">
						Sync ongoing
					</Badge>
				</Flex>
			) : (
				<Button
					variant="outline"
					color="gray"
					disabled={submitting || ingestionJob.locked}
					onClick={() => handleClick()}
				>
					Start a new syncing
				</Button>
			)}
		</Flex>
	);
};

export default SyncKnowledge;
