import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditItemButton = ({ kind, id }: { kind: string; id: string }) => {
	return (
		<Link href={"/" + kind + "s/" + id + "/edit"} className="min-w-[100px]">
			<Button variant="outline">{`Edit ${kind}`}</Button>
		</Link>
	);
};

export default EditItemButton;
