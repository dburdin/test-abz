import styles from "./UserCard.module.scss";
export const UserCard = () => {
  return (
    <li className={styles.userCard}>
      <img
        className={styles.userAvatar}
        width={70}
        height={70}
        src="/svg/photo-cover.svg"
        alt="name"
      />
      <p className={styles.userName}>Name</p>
      <div>
        <p title="Role" className={styles.tooltip}>
          Role
        </p>
        <p title="Email" className={styles.tooltip}>
          Email
        </p>
        <p title="Number" className={styles.tooltip}>
          Number
        </p>
      </div>
    </li>
  );
};
