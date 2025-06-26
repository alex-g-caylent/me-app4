import { Flex, Card, Box, DataList, Badge, Text } from "@radix-ui/themes";
import React from "react";
import colorSequence from "@/app/utils/colorSequence";

const UserDetailsCard = ({ user }: { user: User }) => {
	return (
		<Flex>
			<Card>
				<Box p="4">
					<DataList.Root>
						<DataList.Item>
							<DataList.Label minWidth="88px">Name</DataList.Label>
							<DataList.Value>
								{user.firstName} {user.lastName}
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label minWidth="88px">Email</DataList.Label>
							<DataList.Value>
								<Text>{user.email}</Text>
							</DataList.Value>
						</DataList.Item>
						<DataList.Label>Roles</DataList.Label>
						<Flex>
							<DataList.Item>
								<Flex gap="2">
									{user.roleUsers.map((role, index) => (
										<Badge
											color={colorSequence[index]}
											variant="soft"
											radius="medium"
											size={"1"}
											key={index}
										>
											{role.role.name}
										</Badge>
									))}
								</Flex>
							</DataList.Item>
						</Flex>
						<DataList.Item>
							<DataList.Label>Business Unit</DataList.Label>
							<DataList.Value>{user.businessUnit.name}</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label>Region</DataList.Label>
							<DataList.Value>{user.region.name}</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label>Language</DataList.Label>
							<DataList.Value>{user.language.name}</DataList.Value>
						</DataList.Item>
					</DataList.Root>
				</Box>
			</Card>
		</Flex>
	);
};

export default UserDetailsCard;
