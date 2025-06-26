"use client";
import React, { useEffect } from "react";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import { redirect, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

const LogMeInPage = () => {
	const search = useSearchParams();
	useEffect(() => {
		const jwt = search.get("jwt");
		setCookie("jwt", jwt);
		document.location.href = "/";
	});
	return (
		<Flex className="max-w-[400px] mx-auto my-[50px]">
			<Text className="text-center">
				<Spinner size="3" className="mx-auto" mb="3" />
				You are loggin in to Maestro.
				<br />
				You should be redirected in just few seconds
			</Text>
		</Flex>
	);
};

export default LogMeInPage;
