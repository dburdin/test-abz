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
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const { data } = await FetchData(page, 6);

        const { total_pages: totalPages, users } = data;

        if (users) {
          setUsers((prevUsers) => {
            const isPrevUsers = users.some((currentUser: User) => {
              return prevUsers.some((prevItem) => prevItem.id === currentUser.id);
            });

            if (isPrevUsers) {
              return prevUsers;
            }

            if (totalPages === page) {
              setIsLastPage(true);
            }

            return [...prevUsers, ...users];
          });
        } else {
          toast.error("No data available");
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setIsLoading(false);
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
          !isLastPage &&
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
