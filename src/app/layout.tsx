import type { Metadata } from "next";
import { SparkleHead } from "./SparkleHead";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sparkle Registry",
  description: "Sparkle Registry for AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SparkleHead />
      </head>
      <body>{children}</body>
    </html>
  );
}
