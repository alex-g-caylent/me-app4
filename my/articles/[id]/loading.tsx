import {
	AspectRatio,
	Box,
	Card,
	Container,
	Flex,
	Grid,
	Separator,
} from "@radix-ui/themes";
import { Skeleton } from "@radix-ui/themes";

export default function Loading() {
	return (
		<Container my={{ initial: "0", md: "5" }} p={{ initial: "4", md: "0" }}>
			<Flex justify="end" mb="3">
				<Skeleton className="w-24 h-8" /> {/* Back button */}
			</Flex>
			<Grid columns={{ initial: "1", md: "3" }} mt="6" gap="5">
				<Box className="col-span-2" mr="3">
					<AspectRatio ratio={9 / 3}>
						<Skeleton className="w-full h-full rounded-md" />{" "}
						{/* Cover image */}
					</AspectRatio>
					<Flex my="5" direction="column" gap="5">
						<Flex
							justify="between"
							direction={{ initial: "column", md: "row" }}
							gap={{ initial: "3", md: "0" }}
						>
							<Flex gap="3">
								<Skeleton className="w-8 h-8" /> {/* Pin button */}
								<Skeleton className="w-64 h-8" /> {/* Title */}
							</Flex>
						</Flex>
						<Skeleton className="w-full h-24" /> {/* Description */}
					</Flex>
				</Box>
				<Box>
					<Card className="shadow-lg mb-5">
						<Box p="3">
							<Flex justify="between" mb="3">
								<Skeleton className="w-32 h-6" /> {/* Business Units label */}
								<Flex gap="3">
									<Skeleton className="w-24 h-6" />
									<Skeleton className="w-24 h-6" />
								</Flex>
							</Flex>
							<Separator my="3" size="4" />

							<Flex justify="between" mb="3">
								<Skeleton className="w-24 h-6" /> {/* Regions label */}
								<Flex gap="3">
									<Skeleton className="w-24 h-6" />
									<Skeleton className="w-24 h-6" />
								</Flex>
							</Flex>
							<Separator my="3" size="4" />

							<Flex justify="between" mb="3">
								<Skeleton className="w-24 h-6" /> {/* Courses label */}
								<Flex gap="3">
									<Skeleton className="w-24 h-6" />
								</Flex>
							</Flex>
						</Box>
					</Card>

					<Card className="shadow-lg">
						<Box p="3">
							{/* Metadata fields */}
							{[...Array(6)].map((_, index) => (
								<Box key={index}>
									<Flex justify="between" mb="3">
										<Skeleton className="w-40 h-6" />
										<Skeleton className="w-32 h-6" />
									</Flex>
									{index < 5 && <Separator my="3" size="4" />}
								</Box>
							))}

							<Flex minWidth="100%" mt="5">
								<Skeleton className="w-full h-10" /> {/* Download button */}
							</Flex>
						</Box>
					</Card>
				</Box>
			</Grid>
		</Container>
	);
}
