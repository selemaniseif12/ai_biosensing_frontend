export const metadata = {
  title: "Dashboard",
  description: "Admin and user dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
