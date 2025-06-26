import { Theme } from "@radix-ui/themes";

export const DefaultTheme = ({ children, ...props }: { children: React.ReactNode }) => {
	return (
		<Theme accentColor="red" radius="small" appearance="light" {...props}>
			{children}
		</Theme>
	);
};
