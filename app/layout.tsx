import type { Metadata } from "next";
import SessionManager from "./SessionManager";

export const metadata: Metadata = {
  title: "AI Biosensing Dashboard",
  description: "User and admin dashboards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SessionManager />
        {children}
      </body>
    </html>
  );
}