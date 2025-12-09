import { NavLink, useNavigate } from "react-router-dom";

import { useUserStore } from "@/lib/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="container mx-auto flex items-center justify-between">
        <nav className="flex gap-4">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
        <div className="flex gap-2">
          {user ? (
            <Avatar>
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Button onClick={() => navigate("/sign-in")}>Sign in</Button>
              <Button onClick={() => navigate("/sign-up")}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
