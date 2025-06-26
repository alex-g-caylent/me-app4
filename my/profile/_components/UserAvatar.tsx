import colorSequence from "@/app/utils/colorSequence";
import {
	Avatar,
	Button,
	Flex,
	Heading,
	Link,
	Separator,
	Text,
} from "@radix-ui/themes";
import React, { Suspense } from "react";

const UserAvatar = ({ user, message }: { user: User; message: string }) => {
	const totalColors = colorSequence.length;
	return (
		<Flex align="center" gap="5" mb={{ initial: "3", sm: "0" }}>
			<Flex justify={"between"} mt="5">
				<Flex>
					<Avatar
						src=""
						fallback={user.firstName[0]}
						size="9"
						color={colorSequence[Math.random()]}
					></Avatar>
				</Flex>
			</Flex>
			<Flex direction={"column"} gap={"3"}>
				<Heading>My Profile</Heading>
				<Text>
					{message}
					<b>
						<Suspense>
							{user.firstName} {user.lastName}
						</Suspense>
					</b>
				</Text>
			</Flex>
		</Flex>
	);
};

export default UserAvatar;
