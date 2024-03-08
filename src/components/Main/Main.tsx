import { useState } from "react";

import { User } from "../../types/types";

import { Hero } from "../Hero";
import { Users } from "../Users";
import { SignUpSection } from "../SignUpSection";

export const Main = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <main>
      <Hero />
      <Users users={users} setUsers={setUsers} />
      <SignUpSection setUsers={setUsers} />
    </main>
  );
};
