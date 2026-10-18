import type { Metadata } from "next";

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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}