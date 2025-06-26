import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Image from "next/image";

const AboutMaestro = () => {
	return (
		<Flex direction={"column"} mt="5" p="3" className="max-w-[1100px] mx-auto">
			<Flex direction="column" gap="1">
				<Heading weight="light">About Maestro</Heading>
				<Heading size="4" weight="light" color="gray" mb="3">
					Why would everyone in Edwards benefit from Maestro?
				</Heading>
				<Text className="readable">
					Maestro is a software that uses the power of AI to provide an
					interactive and engaging learning environment for Edwards Lifesciences
					employees. This section will guide you through the basics of Maestro,
					helping you navigate and utilize its features effectively.
				</Text>
			</Flex>
			<Flex gap="4" my="3" p="3" direction={{ initial: "column", md: "row" }}>
				<Box
					width="350px"
					className="transition ease-in-out hover:translate-y-[-10px] duration-300 hover:shadow-lg"
				>
					<Card size="2" className="bg-maestro min-h-[100%]">
						<Flex gap="4" align="center" p="2">
							<Image alt="stars" src="/stars.png" width="60" height="60" />
							<Box>
								<Heading size="3" weight="light" mb="1">
									Boost your wotk efficiency
								</Heading>
								<Text size="2" color="gray">
									Self-improve every day and perform at the highest standards to
									serve patients at your best
								</Text>
							</Box>
						</Flex>
					</Card>
				</Box>

				<Box
					width="350px"
					className="transition ease-in-out hover:translate-y-[-10px] duration-300  hover:shadow-lg"
				>
					<Card size="2" className="bg-maestro min-h-[100%]">
						<Flex gap="4" align="center" p="2">
							<Image alt="book" src="/book.png" width="60" height="60" />
							<Box>
								<Heading size="3" weight="light" mb="1">
									Transform curiosity into knowledge
								</Heading>
								<Text size="2" color="gray">
									Fulfill your desire for knowing and understanding more.
									Anytime and anywhere!
								</Text>
							</Box>
						</Flex>
					</Card>
				</Box>

				<Box
					width="350px"
					className="transition ease-in-out hover:translate-y-[-10px] duration-300 hover:shadow-lg"
				>
					<Card size="2" className="bg-maestro min-h-[100%]">
						<Flex gap="4" align="center" p="2">
							<Image alt="users" src="/users.png" width="60" height="60" />
							<Box>
								<Heading size="3" weight="light" mb="1">
									Establish a culture of learning
								</Heading>
								<Text size="2" color="gray">
									Make personalized education possible and collaborate with
									others for common good.
								</Text>
							</Box>
						</Flex>
					</Card>
				</Box>
			</Flex>

			<Flex>
				<Text className="readable">
					Maestro is a valuable tool for Edwards Lifesciences employees,
					designed to streamline and enhance your learning experience through
					advanced AI capabilities. By using the power of AI, Maestro
					personalizes learning content based on your specific role,
					competencies, and skills. This ensures that you receive targeted
					educational materials relevant to your job functions, making your
					learning more efficient and impactful.
				</Text>
			</Flex>
		</Flex>
	);
};

export default AboutMaestro;
