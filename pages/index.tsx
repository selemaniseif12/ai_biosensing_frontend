import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/navbar";

export default function Home() {
  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-xl">AI Biosensor</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>Home</NavbarItem>
          <NavbarItem>About</NavbarItem>
          <NavbarItem>Contact</NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="p-10">
        <h1 className="text-3xl font-bold">Welcome to AI Biosensor</h1>
        <p className="mt-4 text-lg">
          Your intelligent biosensing dashboard is running successfully.
        </p>
      </main>
    </div>
  );
}
