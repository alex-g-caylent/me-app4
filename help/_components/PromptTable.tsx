import { Flex, Table, Text } from "@radix-ui/themes";
import React from "react";

const PromptTable = () => {
	return (
		<Flex
			direction="column"
			mb="9"
			gap="5"
			p="3"
			className="max-w-[1100px] mx-auto"
		>
			<Table.Root size={{ initial: "1", md: "3" }}>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell className="w-[250px]"></Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="w-[300px]">
							POOR PROMPT
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="w-[300px]">
							IMPROVED PROMPT
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row align={"center"}>
						<Table.RowHeaderCell>
							<Text>
								<b>Vague</b> vs <b>Specific</b>
							</Text>
						</Table.RowHeaderCell>
						<Table.Cell>“Tell me about Edwards valves.”</Table.Cell>
						<Table.Cell>
							“Please compare the key design features of the Edwards SAPIEN 3
							and SAPIEN 3 Ultra valves, focusing on patient eligibility and
							hemodynamic performance.”
						</Table.Cell>
					</Table.Row>
					<Table.Row align={"center"}>
						<Table.RowHeaderCell>
							<Text>
								<b>Unfocused</b> vs <b>Targeted</b>
							</Text>
						</Table.RowHeaderCell>
						<Table.Cell>““What are the benefits of our products?””</Table.Cell>
						<Table.Cell>
							“Could you outline three main benefits of the Magna Ease valve for
							patients with smaller aortic annuli?”
						</Table.Cell>
					</Table.Row>
					<Table.Row align={"center"}>
						<Table.RowHeaderCell>
							<Text>
								<b>Single Sentence</b> vs <b>Structured Query</b>
							</Text>
						</Table.RowHeaderCell>
						<Table.Cell>“What’s new in heart valve surgery?”</Table.Cell>
						<Table.Cell>
							“Could you summarize the latest technology advancements in
							surgical aortic valve replacement (SAVR), focusing on any new
							Edwards Lifesciences product releases in the last two years?”
						</Table.Cell>
					</Table.Row>
					<Table.Row align={"center"}>
						<Table.RowHeaderCell>
							<Text>
								<b>Lack of Follow-Up</b> vs <b>Iterative Refinement</b>
							</Text>
						</Table.RowHeaderCell>
						<Table.Cell>“That’s not what I wanted.”</Table.Cell>
						<Table.Cell>
							“Could you clarify whether the SAPIEN 3 Ultra valve is indicated
							for high-risk or intermediate-risk patients? I’m specifically
							looking for guidelines on patient eligibility criteria.”
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Flex>
	);
};

export default PromptTable;
