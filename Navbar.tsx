import React from "react";
import Link from "next/link";
import { Flex } from "@radix-ui/themes";
import DesktopNavLinks from "./components/navbar/DesktopNavLinks";
import MobileNavLinks from "./components/navbar/MobileNavLinks";
import AvatarBox from "./components/navbar/AvatarBox";
import { fetchApi } from "./utils/fetchInterceptor";
import { getJwt, hasJwtExpired, mightBeLoggedIn } from "./utils/auth";
import { Toast } from "./components/ClientToast";

const Navbar = async () => {
	if (await mightBeLoggedIn()) {
		const loggedUser = await fetchApi(`/my/profile`);
		// const loggedUser = await fetchApi(`/auth/user`);
		// Add null check and use proper array methods
		const roles: string[] =
			loggedUser?.roleUsers?.map((r: Role) => r?.role?.name).filter(Boolean) ||
			[];
		return (
			<nav className="p-0 m-0 overflow-x-hidden">
				<Flex
					direction={{ initial: "row", sm: "column" }}
					justify="between"
					align={{ initial: "center", sm: "end" }}
					className="bg-navbar"
				>
					<Flex justify="between" className="p-5 w-full">
						<Flex display={{ initial: "none", sm: "flex" }}>
							<AvatarBox user={loggedUser} />
						</Flex>
						<Flex align="center" gap="3">
							<Link href="/">
								<img
									src="/maestro.png"
									alt="Maestro logo"
									width={80}
									className="mr-5"
								/>
							</Link>
						</Flex>
					</Flex>
					<Flex display={{ initial: "none", sm: "flex" }} justify="end">
						<DesktopNavLinks roles={roles} />
					</Flex>
					<Flex display={{ initial: "flex", sm: "none" }} justify="end">
						<MobileNavLinks user={loggedUser} roles={roles} />
					</Flex>
				</Flex>
			</nav>
		);
	}

	const hasJwt = await getJwt();
	const isJwtExpired = await hasJwtExpired();
	if (hasJwt && isJwtExpired) {
		return <Toast type="warning" message="Login has expired" />;
	}
};

export default Navbar;
