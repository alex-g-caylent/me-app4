import { Flex, Tooltip } from "@radix-ui/themes";
import React from "react";

const Skillbar = ({ result, color }: { result: number; color: string }) => {
	return (
		<Flex position={"relative"}>
			<Tooltip content={result}>
				<Flex
					position={"absolute"}
					style={{ backgroundColor: color }}
					width={"16px"}
					height={"16px"}
					className="rounded-full"
					left={`${result * 7}0px`}
					top="-8px"
				></Flex>
			</Tooltip>
		</Flex>
	);
};

export default Skillbar;
