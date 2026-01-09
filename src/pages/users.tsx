import { useEffect, useState } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";

import type { User } from "@/index";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Users() {
  const { contactsFlag } = useFlags();
  const [users, setUsers] = useState<User[]>([]);

  console.log(contactsFlag);

  useEffect(() => {
    async function getUsers() {
      const users = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await users.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  return (
    <>
      <h3 className="text-2xl font-bold">Users</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-start gap-2 rounded-md border p-4"
          >
            {user.avatar ? (
              <picture>
                <source type="image/webp" srcSet={user.avatar} />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-12 rounded-full object-cover"
                />
              </picture>
            ) : (
              <Avatar className="size-12">
                <AvatarFallback className="bg-muted-foreground text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <Badge variant="outline" className="w-fit self-end">
                {user.role}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
