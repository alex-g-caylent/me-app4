"use client";
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge, Button, Dialog, Flex, Spinner, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useRouter } from "next/navigation";
import DeleteUserModal from "../_components/DeleteUserModal";
import { getCookie } from "cookies-next";
import colorSequence from "@/app/utils/colorSequence";

const UsersTable = ({ users }: { users: User }) => {
	const jwt = getCookie("jwt");
	const router = useRouter();
	const ViewUserButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() => router.push("/users/" + props.value.toLocaleString())}
			>
				<EyeOpenIcon />
			</Button>
		);
	};
	const EditUserButton = (props) => {
		return (
			<Button
				variant="outline"
				color="gray"
				mt="1"
				onClick={() =>
					router.push("/users/" + props.value.toLocaleString() + "/edit")
				}
			>
				<Pencil2Icon />
			</Button>
		);
	};

	const UserRolesCell = (props) => {
		const [user, setUser] = useState<User[]>([]);
		useEffect(() => {
			fetch("https://sviluppo4.arsdue.com/users/" + props.data.id, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + jwt,
				},
			})
				.then((response) => response.json())
				.then((json) => setUser(json));
		}, []);
		console.log(user);
		return user.roleUsers ? (
			<div>
				{user.roleUsers.map((r, index) => (
					<Badge key={index} mr="1" color={colorSequence[index]}>
						{r.role.name}
					</Badge>
				))}
			</div>
		) : (
			<Spinner className="mt-2" />
		);
	};

	const [colDefs, setColDefs] = useState([
		{ field: "firstName" },
		{ field: "lastName", filter: true },
		{ field: "region.name" },
		{ field: "businessUnit.name" },
		// {
		// 	field: "roleUsers.role.name",
		// 	headerName: "User roles",
		// 	cellRenderer: UserRolesCell,
		// 	width: 300,
		// },
		{ field: "language.name", headerName: "Language" },
		{
			field: "id",
			headerName: "View",
			width: 80,
			cellRenderer: ViewUserButton,
		},
		{
			field: "id",
			headerName: "Edit",
			width: 80,
			cellRenderer: EditUserButton,
		},
	]);
	const [rowData, setRowData] = useState(users);
	return (
		<div
			className="ag-theme-quartz" // applying the Data Grid theme
			style={{ height: 500 }} // the Data Grid will fill the size of the parent container
		>
			<AgGridReact rowData={rowData} columnDefs={colDefs} />
			{/* <DeleteUserButton user={user} />; */}
		</div>
	);
};

export default UsersTable;
