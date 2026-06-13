// components/DashboardLayout.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  Button,
  Chip,
} from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Customers", href: "/dashboard/customers" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "ML", href: "/dashboard/ml" },
  { label: "Admin", href: "/dashboard/admin" },
  { label: "Logs", href: "/dashboard/logs" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-black/40 backdrop-blur-md hidden md:flex flex-col">
        <div className="px-6 py-5 border-b border-gray-800">
          <p className="text-lg font-bold">AI Biosensor</p>
          <p className="text-xs text-gray-400 mt-1">
            SaaS Monitoring Platform
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`px-3 py-2 rounded-md text-sm cursor-pointer flex items-center justify-between ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <Chip size="sm" color="primary" variant="flat">
                      Active
                    </Chip>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-800 text-xs text-gray-500">
          <p>Logged in as</p>
          <p className="font-medium text-gray-300">admin@ai-biosensor.com</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <Navbar
          maxWidth="full"
          className="border-b border-gray-800 bg-black/40 backdrop-blur-md"
        >
          <NavbarBrand>
            <p className="font-semibold text-sm text-gray-300">
              AI Biosensor Dashboards
            </p>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button size="sm" variant="flat" color="primary">
                API Docs
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button size="sm" variant="bordered" color="default">
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-950 via-black to-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
