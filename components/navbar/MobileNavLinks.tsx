"use client";
import { Flex } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import { DefaultTheme } from "../DefaultTheme";
import links from "../../utils/navlink";
import AvatarBox from "./AvatarBox";
import { SlClose, SlMenu } from "react-icons/sl";
import isUserAllowed from "@/app/utils/isUserAllowed";
import styles from "./mobile-nav-links.module.css";

const MobileNavLinks = ({ roles, user }: { roles: string[]; user: User }) => {
	const [isOpen, setOpen] = useState(false);
	const [shouldRender, setRender] = useState(false);
	const currentPath = usePathname();

	useEffect(() => {
		// Close open menu if viewport is resized from mobile to desktop
		const mediaQueryList = window.matchMedia("(min-width: 768px)");
		const handleChange = (event: MediaQueryListEvent) => {
			if (event.matches) {
				setOpen(false);
				setRender(false);
			}
		};
		mediaQueryList.addEventListener("change", handleChange);

		return () => mediaQueryList.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		if (isOpen) {
			setRender(true);
		}
	}, [isOpen]);

	const onAnimationEnd = useCallback(() => {
		// Delay removing the menu from the DOM until the exit animation is complete
		if (!isOpen) {
			setRender(false);
		}
	}, [isOpen]);

	return (
		<Dialog.Root open={isOpen} onOpenChange={setOpen}>
			<>
				<Dialog.Trigger asChild>
					<button type="button" className="p-5">
						<SlMenu
							size="30"
							className={isOpen ? "hidden" : "md:hidden visible"}
						/>
						<SlClose size="30" className={isOpen ? "visible" : "hidden"} />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal forceMount>
					{shouldRender && (
						<Dialog.Overlay
							className={`fixed w-full h-full ${isOpen ? "block" : "hidden"}`}
						/>
					)}
					{shouldRender && (
						<Dialog.Content
							className={`md:hidden bg-navbar h-dvh w-[85%] shadow-xl absolute p-5 ${
								styles.content
							} ${isOpen ? styles.contentShow : styles.contentHide}`}
							onAnimationEnd={onAnimationEnd}
							onOpenAutoFocus={(event) => event.preventDefault()}
						>
							<Dialog.Title className="sr-only">Site Menu</Dialog.Title>
							<Dialog.Description className="sr-only">
								Site Menu
							</Dialog.Description>
							<DefaultTheme hasBackground={false}>
								<AvatarBox user={user} />
								<nav>
									<ul className="flex-col flex-1 text-right">
										{links.map(
											(link) =>
												isUserAllowed(roles, link.for) && (
													<li key={link.href} className="py-2">
														<Link
															href={link.href}
															className={classnames({
																"text-red-800": link.href === currentPath,
																"text-zinc-500": link.href != currentPath,
																"font-semibold text-l": true,
															})}
															onClick={() => setOpen(false)}
														>
															{link.label}
														</Link>
													</li>
												)
										)}
										<li className="py-2">
											<Link
												href="/logout"
												className={classnames({
													"font-semibold text-l": true,
												})}
											>
												Logout
											</Link>
										</li>
									</ul>
								</nav>
							</DefaultTheme>
						</Dialog.Content>
					)}
				</Dialog.Portal>
			</>
		</Dialog.Root>
	);
};

export default MobileNavLinks;
