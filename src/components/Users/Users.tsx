import styles from "./Users.module.scss";
import { UserCard } from "../UserCard";

export const Users = () => {
  return (
    <section id="users" className={styles.userSection}>
      <div className="global-container">
        <h2 className={styles.userHeading}>Working with GET request</h2>
        <ul className={styles.userCardContainer}>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </ul>
        <button className={styles.userButton}>Show More</button>
      </div>
    </section>
  );
};
