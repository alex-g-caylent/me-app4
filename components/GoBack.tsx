"use client";
import { Button, Link } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = () => {
	const router = useRouter();
	const handleClick = () => {
		router.back();
	};
	return (
		<Link underline="auto" onClick={() => handleClick()}>
			Go back
		</Link>
	);
};

export default GoBack;
