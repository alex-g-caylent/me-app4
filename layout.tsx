import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Flex, Box, Grid, Section, Text } from "@radix-ui/themes";
import Navbar from "./Navbar";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { DefaultTheme } from "./components/DefaultTheme";
import Footer from "./components/Footer";

export const metadata: Metadata = {
	title: "Maestro",
	description: "Share knowledge",
};

const myFont = localFont({ src: "./fonts/DM-Sans.woff" });

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dm_sans.className">
			<body className={"flex flex-col m-0 p-0"}>
				<ToastContainer />
				<DefaultTheme>
					<Navbar />
					<main className="flex-auto min-h-[80vh]">
						<Suspense>{children}</Suspense>
					</main>

					<Footer />
				</DefaultTheme>
			</body>
		</html>
	);
}
