import type { Metadata } from "next";
import "./globals.css";
import "./components/ThemeToggle.css";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "My personal portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				{children}
				<ChatWidget />
			</body>
		</html>
	);
}
