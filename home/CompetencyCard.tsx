import { Flex, Text } from "@radix-ui/themes";
import React from "react";

const CompetencyCard = ({
	competency,
	colors,
	index,
}: {
	competency: Competency;
	colors: string[];
	index: number;
}) => {
	return (
		<Flex
			width="100"
			minHeight={"150px"}
			align={"center"}
			justify={"center"}
			className={`border-none w-100 p-6 ${colors[index]} rounded-md hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out md:py-10`}
		>
			<Text
				weight="light"
				size="6"
				align={"center"}
				className="py-1 text-lg font-bold"
			>
				{competency.name}
			</Text>
		</Flex>
	);
};

export default CompetencyCard;
