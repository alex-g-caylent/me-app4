"use client";
import { CheckboxGroup, Flex, Heading, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const FilterSideBar = ({ competencies }: { competencies: Competency[] }) => {
	const menuItems = ["recommended for you", "in progress", "saved"];
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [activeTag, setActiveTag] = useState(searchParams?.get("tag"));
	const [loading, setLoading] = useState(false);

	const handleTagChange = (tag: string) => {
		setLoading(true);
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set("tag", tag.replace(/\s+/g, "-").toLowerCase());
		router.push(`${pathname}?${currentParams.toString()}`);
		setActiveTag(tag);
		setLoading(false);
	};

	const handleSearch = (query: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		if (query) {
			currentParams.set("search", query);
		} else {
			currentParams.delete("search");
		}
		router.push(`${pathname}?${currentParams.toString()}`);
	};

	return (
		<Flex
			direction="column"
			gap="4"
			p="5"
			className="border-[1px] rounded-md shadow-md bg-gray-100"
		>
			<Flex mb="4">
				<TextField.Root
					placeholder="Search articles..."
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams?.get("search") || ""}
					className="w-[100%]"
				>
					<TextField.Slot>
						<HiOutlineSearch />
					</TextField.Slot>
				</TextField.Root>
			</Flex>
			{loading && <div className="loading-indicator">Loading...</div>}
			<Heading as="h2" size="4" className="pb-2">
				Filters
			</Heading>
			<ul>
				<Link
					href="/mylibrary"
					key="all"
					onClick={() => {
						handleTagChange("all");
					}}
				>
					<li className={"first-letter:capitalize py-2 hover:bg-gray-300"}>
						All content
					</li>
				</Link>
				{menuItems.map((item, index) => (
					<Link
						href={`?tag=${item.replace(/\s+/g, "-").toLowerCase()}`}
						key={index}
						onClick={() => {
							handleTagChange(item);
						}}
					>
						<li
							className={
								"first-letter:capitalize py-2 px-5 hover:bg-gray-300 " +
								(activeTag === item && " border-l-8 ")
							}
						>
							{item}
						</li>
					</Link>
				))}
			</ul>
			<div className="flex border-b-2 mx-4 my-4"></div>
			<div className="py-5">
				<Flex direction="column">
					<CheckboxGroup.Root defaultValue={["0"]}>
						{competencies.map((option, index) => (
							<CheckboxGroup.Item
								key={index}
								value={option.name}
								className="pb-2"
								disabled={index}
								onChange={() => {}}
							>
								{option.name}
							</CheckboxGroup.Item>
						))}
					</CheckboxGroup.Root>
				</Flex>
			</div>
		</Flex>
	);
};

export default FilterSideBar;
