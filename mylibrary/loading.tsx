import { Box, Flex, Grid, Skeleton } from "@radix-ui/themes";
import React from "react";
import ArticleCard from "../articles/_components/ArticleCard";
import FilterSideBar from "./FilterSideBar";

const MyLibrary = async () => {
	return (
		<Grid
			columns={{ initial: "1", md: "4" }}
			m={{ initial: "4", md: "0" }}
			mb="9"
			gap="5"
		>
			<Skeleton className="h-[400px] rounded-lg" mt="5" />
			<Box className="mt-5 col-span-3">
				<Grid
					columns={{ initial: "1", md: "2", lg: "3" }}
					gap="5"
					justify="start"
					maxWidth="1100px"
				>
					<Box minWidth={"300px"}>
						<Skeleton className="min-h-[400px]" />
					</Box>
					<Box minWidth={"300px"}>
						<Skeleton className="min-h-[400px]" />
					</Box>
					<Box minWidth={"300px"}>
						<Skeleton className="min-h-[400px]" />
					</Box>
					<Box minWidth={"300px"}>
						<Skeleton className="min-h-[400px]" />
					</Box>
					<Box minWidth={"300px"}>
						<Skeleton className="min-h-[400px]" />
					</Box>
				</Grid>
			</Box>
		</Grid>
	);
};

export default MyLibrary;
