"use client";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";

type Article = {
	id: string;
	title: string;
	description: string;
};

const ArticlesTable = ({ articles }: { articles: Article[] }) => {
	const router = useRouter();
	const ViewArticleButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() => router.push("/articles/" + props.value.toLocaleString())}
			>
				<EyeOpenIcon />
			</Button>
		);
	};
	const EditArticleButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() =>
					router.push("/articles/" + props.value.toLocaleString() + "/edit")
				}
			>
				<Pencil2Icon />
			</Button>
		);
	};
	const [rowData, setRowData] = useState(articles);
	const [colDefs, setColDefs] = useState([
		{ field: "title", filter: true, flex: 1 },
		{ field: "description", flex: 3 },
		{ field: "duration", flex: 1 },
		{
			field: "id",
			headerName: "View",
			width: 80,
			cellRenderer: ViewArticleButton,
		},
		{
			field: "id",
			headerName: "Edit",
			width: 80,
			cellRenderer: EditArticleButton,
		},
	]);

	return (
		<div
			className="ag-theme-quartz" // applying the Data Grid theme
			style={{ height: 900 }} // the Data Grid will fill the size of the parent container
		>
			<AgGridReact rowData={rowData} columnDefs={colDefs} />
		</div>
	);
};

export default ArticlesTable;
