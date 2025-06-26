"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import classnames from "classnames";
import links from "../../utils/navlink";
import isUserAllowed from "@/app/utils/isUserAllowed";

const currentNavLink = function (url: string, linkPath: string) {
	let result = false;
	if (url.includes(linkPath.split("/").pop()!)) {
		result = true;
	}
	return result;
};

const DesktopNavLinks = ({ roles }: { roles: string[] }) => {
	const currentPath = usePathname();

	return (
		<nav>
			<ul className="flex-col tabs group">
				{links.map(
					(link) =>
						isUserAllowed(roles, link.for) && (
							<li
								key={link.href}
								className={
									currentNavLink(currentPath, link.href) ? " active" : ""
								}
							>
								<Link
									href={`${link.href}`}
									className={classnames({
										"text-red-800": link.href === currentPath,
										"text-zinc-500": link.href != currentPath,
										"hover:text-red-500 transition-colors": true,
									})}
								>
									{link.label}
								</Link>
							</li>
						)
				)}
				<li className="pr-5">
					<Link
						href="/logout"
						className={"hover:text-red-500 transition-colors"}
					>
						Logout
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default DesktopNavLinks;
