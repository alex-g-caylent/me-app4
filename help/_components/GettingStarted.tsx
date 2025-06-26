import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GoRocket } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { MdWifiTethering } from "react-icons/md";
import { PiFolderPlusThin } from "react-icons/pi";
import Image from "next/image";

const GettingStarted = () => {
	return (
		<Flex direction={"column"} my="8" p="3" className="max-w-[1100px] mx-auto">
			<Flex direction="column" mb="3">
				<Heading weight="light">Getting started</Heading>
				<Heading size="4" weight="light" color="gray">
					How you can use Maestro in your day-to-day job
				</Heading>
			</Flex>
			<Flex
				gap="5"
				align={{ initial: "center", sm: "start" }}
				direction={{ initial: "column", sm: "row" }}
			>
				<Flex
					direction="column"
					justify="center"
					className="max-w-[160px] text-center mx-4"
				>
					<Flex
						justify="center"
						className="bg-maestro p-5 rounded-full w-[150px] mb-4"
					>
						<Image alt="user" src="/user.png" width="100" height="100" />
					</Flex>

					<Text size="2" align="center">
						Personalized content based on your profile
					</Text>
				</Flex>
				<Flex
					direction="column"
					justify="center"
					className="max-w-[160px] text-center mx-4"
				>
					<Flex
						justify="center"
						className="bg-maestro p-5 rounded-full w-[150px] mb-4"
					>
						<Image alt="book" src="/book.png" width="100" height="100" />
					</Flex>

					<Text size="2" align="center">
						Content limited to one competency: Clinical & Product Knowledge
					</Text>
				</Flex>
				<Flex
					direction="column"
					justify="center"
					className="max-w-[160px] text-center mx-4"
				>
					<Flex
						justify="center"
						className="bg-maestro p-5 rounded-full w-[150px] mb-4"
					>
						<Image alt="folder" src="/folder.png" width="100" height="100" />
					</Flex>

					<Text size="2" align="center">
						+100 documents uploaded in the library
					</Text>
				</Flex>
				<Flex
					direction="column"
					justify="center"
					className="max-w-[160px] text-center mx-4"
				>
					<Flex
						justify="center"
						className="bg-maestro p-5 rounded-full w-[150px] mb-4"
					>
						<Image alt="radar" src="/radar.png" width="100" height="100" />
					</Flex>

					<Text size="2" align="center">
						Accessible via website from laptop, tablet and mobile phone
					</Text>
				</Flex>
				<Flex
					direction="column"
					justify="center"
					className="max-w-[160px] text-center mx-4"
				>
					<Flex
						justify="center"
						className="bg-maestro p-5 rounded-full w-[150px] mb-4"
					>
						<Image alt="rocket" src="/rocket.png" width="100" height="100" />
					</Flex>

					<Text size="2" align="center">
						Constantly evolving and improving... many new features to come!
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default GettingStarted;
