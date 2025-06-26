import { Section, Grid, Text, Flex, Heading, Link } from "@radix-ui/themes";
import React from "react";

const Footer = () => {
	return (
		<Section className="bg-navbar" p="5">
			<Grid
				columns={{ initial: "1", sm: "3" }}
				gap="1"
				px="4"
				className="max-w-[1400px] mx-auto"
			>
				<Flex direction="column" gap="1">
					<Heading size="3">Explore Maestro</Heading>
					<Flex direction={"column"} gap="0">
						<Link href="/home">
							<Text size="2">Home</Text>
						</Link>
						<Link href="/my/profile">
							<Text size="2">My Profile</Text>
						</Link>
						<Link href="/chat">
							<Text size="2">ChatMaestro</Text>
						</Link>
						<Link href="/mylibrary">
							<Text size="2">Library</Text>
						</Link>
						<Link href="/help">
							<Text size="2">Help</Text>
						</Link>
					</Flex>
				</Flex>
				<Flex direction="column" gap="2">
					<Heading size="3">Contact Us</Heading>
					<Text size="2">In case of need please contact</Text>
					<Text size="2" className="italic">
						maestro@edwards.com
					</Text>
					<Text size="2">
						To report any technical issue please submit a ticket in Service Now:{" "}
						<Link href="https://edwards.service-now.com/sp?id=sc_cat_item&sys_id=9fab39e2d7532100a9ad1e173e24d484">
							click here
						</Link>
						.
					</Text>
				</Flex>
				<Flex
					direction="column"
					align={{ initial: "center", md: "end" }}
					justify="center"
				>
					<img
						src="/maestro.png"
						alt="Maestro Logo"
						width={100}
						height="auto"
					/>
					<Text size="2">Version 3.3.77</Text>
				</Flex>
			</Grid>
		</Section>
	);
};

export default Footer;
