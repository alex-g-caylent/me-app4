"use client";
import {
	Button,
	Container,
	Flex,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Logout = () => {
	const router = useRouter();
	const search = useSearchParams();
	useEffect(() => {
		const jwt = search.get("jwt");
		deleteCookie("jwt");
		document.location.href = "/";
	});
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<Container py={{ initial: "2", md: "9" }} px="4" maxWidth={"600px"}>
			<Suspense>
				<Flex direction="column" gap="4" className="pt-[200px]">
					<Image
						src="/maestro.png"
						alt="maestro-logo"
						width={100}
						height={100}
						className="pb-4"
					/>
					<Heading>You just logged out of Maestro</Heading>
					<Text>
						Thank you for using Maestro. We hope your experience was good
					</Text>
					<Separator my="3" size="4" />
					<Link href="/login">
						<Button variant="outline">Log in with SSO</Button>
					</Link>
				</Flex>
			</Suspense>
		</Container>
	);
};

export default Logout;
