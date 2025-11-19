import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <nav className="container mx-auto flex gap-4">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/create-contact">Create Contact</NavLink>
      </nav>
    </header>
  );
}
