import { Box, Group, Stack, Table, Text } from "@mantine/core";
import { capitalize } from "radash";
import { Icon } from "~/components/Icon";
import type { CloudInstanceType } from "~/types";
import { iconDollar, iconHammer, iconMemory, iconQuery, iconStar, iconWarning } from "~/util/icons";
import { Tile } from "../Tile";

export interface InstanceTypeProps {
	type: CloudInstanceType;
	isActive?: boolean;
	isLimited?: boolean;
	inactive?: boolean;
	onSelect?: (type: string) => void;
}

export function InstanceType({ type, isActive, isLimited, inactive, onSelect }: InstanceTypeProps) {
	return (
		<Tile
			isActive={isActive}
			onClick={onSelect ? () => onSelect(type.slug) : undefined}
			disabled={type.enabled === false || isLimited}
			inactive={inactive}
		>
			<Group
				wrap="nowrap"
				align="center"
			>
				<Stack
					flex={1}
					gap={0}
				>
					<Group>
						<Text
							c="bright"
							fw={600}
							fz="xl"
						>
							{type.display_name}
						</Text>
					</Group>
					{type.enabled === false ? (
						<Text c="red">Not available in your current plan</Text>
					) : (
						isLimited && (
							<Group
								gap="xs"
								mt="lg"
								c="orange"
							>
								<Icon path={iconWarning} />
								<Text size="sm">
									Maximum amount of instances of this type in use
								</Text>
							</Group>
						)
					)}
				</Stack>
				<Box>
					<Table>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td
									c="bright"
									miw={45}
									ta="right"
								>
									{type.cpu}
								</Table.Td>
								<Table.Td>
									<Group>vCPU</Group>
								</Table.Td>
							</Table.Tr>
							<Table.Tr>
								<Table.Td
									c="bright"
									miw={45}
									ta="right"
								>
									{formatMemory(type.memory)}
								</Table.Td>
								<Table.Td>
									<Group>Memory</Group>
								</Table.Td>
							</Table.Tr>
						</Table.Tbody>
					</Table>
				</Box>
			</Group>
		</Tile>
	);
}

function formatMemory(amountInMB: number) {
	if (amountInMB < 1000) {
		return `${amountInMB} MB`;
	}

	return `${amountInMB / 1024} GB`;
}
