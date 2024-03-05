import { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "./Users.module.scss";

import { FetchData } from "../../api/api";
import { User } from "../../interfaces/interfaces";

import { UserCard } from "../UserCard";
import { Loader } from "../Loader";

export const Users = ({
  users,
  setUsers,
}: {
  users: User[];
  setUsers: Dispatch<React.SetStateAction<User[]>>;
}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setIsloading(true);
      try {
        const { data } = await FetchData(page, 6);
        const { total_users: totalUsers } = data;

        setTotalUsers(totalUsers);

        if (data) {
          setUsers((prevUsers) => [...prevUsers, ...data.users]);
        } else {
          toast.error("No data available");
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setIsloading(false);
      }
    };

    getData();
  }, [page, setUsers]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section id="users" className={styles.userSection}>
      <div className="global-container">
        <h2 className={styles.userHeading}>Working with GET request</h2>

        <ul className={styles.userCardContainer}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>

        {isLoading ? (
          <Loader />
        ) : (
          totalUsers !== users.length &&
          !isLoading && (
            <button onClick={loadMore} className={styles.userButton}>
              Show More
            </button>
          )
        )}
      </div>
    </section>
  );
};
