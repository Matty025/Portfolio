import type { Metadata } from "next";
import "./globals.css";
import "./components/ThemeToggle.css";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "My personal portfolio",
		icons: {
		icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWxXPjh2n4GxLykdslXG4XXjwlr6e_h_T0g&s",
	},
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
