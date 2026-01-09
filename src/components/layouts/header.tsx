import { LayoutDashboard, SettingsIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";

import type { HeaderNavigationItem } from "@/index";
import { useUserStore } from "@/lib/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navigationItems: HeaderNavigationItem[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: <LayoutDashboard />,
  },
  {
    label: "Users",
    to: "/users",
    icon: <UsersIcon />,
  },
  {
    label: "Contacts",
    to: "/contacts",
    icon: <UsersIcon />,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: <SettingsIcon />,
  },
];

export default function Header() {
  const user = useUserStore((state) => state.user);

  return (
    <header className="border-b p-4">
      <div className="container mx-auto flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer self-end">
              <AvatarImage src={user?.photoURL || ""} />
              <AvatarFallback className="bg-muted-foreground text-primary-foreground">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <nav>
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.to}>
                    {item.icon}
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </nav>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
