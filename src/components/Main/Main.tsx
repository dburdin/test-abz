import { useState } from "react";
import { Hero } from "../Hero";
import { Users } from "../Users";
import { User } from "../../interfaces/interfaces";

export const Main = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <main>
      <Hero />
      <Users users={users} setUsers={setUsers} />
    </main>
  );
};
