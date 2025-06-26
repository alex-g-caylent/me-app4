import { Grid, Flex, Heading, Skeleton } from "@radix-ui/themes";
import React from "react";

const LoadingChat = () => {
	return (
		<Grid columns={{ initial: "1", md: "4" }} className="w-[100%]">
			<Flex className="h-[100%]">
				<Skeleton width={"80%"} height={"100%"} />
			</Flex>
			<Flex direction="column" p="5" justify="between" className="col-span-3">
				<Flex direction="column">
					<Heading mb="2" size="3">
						<Skeleton height={"30px"} mb="3" />
					</Heading>

					<Flex direction="column" gap="3">
						<Skeleton height={"50px"} width={"100%"} />
						<Skeleton height={"50px"} width={"100%"} />
						<Skeleton height={"50px"} width={"100%"} />
						<Skeleton height={"50px"} width={"100%"} />
						<Skeleton height={"50px"} width={"100%"} />
					</Flex>
				</Flex>
				<Flex className="w-[100%]" justify={"between"}>
					<Skeleton height={"30px"} />
				</Flex>
			</Flex>
		</Grid>
	);
};

export default LoadingChat;
