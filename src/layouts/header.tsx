import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b p-4">
      <nav className="container mx-auto flex gap-4">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </nav>
    </header>
  );
}
