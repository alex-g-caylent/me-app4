import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import React from "react";

interface Props {
	msg: string;
}

const FormCallout = ({ msg }: Props) => {
	return (
		<Callout.Root color="red" role="alert" size="1">
			<Callout.Icon>
				<ExclamationTriangleIcon />
			</Callout.Icon>
			<Callout.Text>{msg}</Callout.Text>
		</Callout.Root>
	);
};

export default FormCallout;
