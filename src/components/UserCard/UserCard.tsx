import styles from "./UserCard.module.scss";

import { User } from "../../interfaces/interfaces";

export const UserCard = ({ user: { photo, position, name, email, phone } }: { user: User }) => {
  return (
    <li className={styles.userCard}>
      <img className={styles.userAvatar} width={70} height={70} src={photo} alt={name} />
      <p className={styles.userName}>{name}</p>
      <div>
        <p>{position}</p>
        <a className={`${styles.tooltip} ${styles.title}`} href={`mailto:${email}`} title={email}>
          {email}
        </a>
        <a className={styles.title} href={`tel:${phone}`}>
          {phone}
        </a>
      </div>
    </li>
  );
};
