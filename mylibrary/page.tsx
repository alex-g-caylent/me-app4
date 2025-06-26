import { Box, Grid } from "@radix-ui/themes";
import React, { Suspense } from "react";
import FilterSideBar from "./_components/FilterSideBar";
import { fetchApi } from "../utils/fetchInterceptor";
import LibraryArticles from "./_components/LibraryArticles";

const MyLibrary = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));

	const competencies = await fetchApi(`/competencies`, {
		next: {
			revalidate: 3600, // Cache for 1 hour
		},
	});

	return (
		<Grid
			columns={{ initial: "1", md: "4" }}
			m={{ initial: "4", md: "0" }}
			mb="9"
		>
			<div className="column-gap-1 md:m-5">
				<Suspense>
					<FilterSideBar competencies={competencies} />
				</Suspense>
			</div>
			<Box className="mt-5 col-span-3">
				<LibraryArticles />
			</Box>
		</Grid>
	);
};

export default MyLibrary;
