export const metadata = {
  title: "AI Biosensing Dashboard",
  description: "User and admin dashboards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
