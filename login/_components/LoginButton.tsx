"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
	return (
		<Link href={`${process.env.NEXT_PUBLIC_APIBASE}/auth/sso/saml/login`}>
			<Button type="submit" mt="3" variant="outline">
				Log in with SSO
			</Button>
		</Link>
	);
};

export default LoginButton;
