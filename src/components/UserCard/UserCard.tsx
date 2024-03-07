import styles from "./UserCard.module.scss";

import { User } from "../../types/types";
import { LENGTH_TO_TRIM } from "../../consts/consts";
import { getTruncatedText } from "../../helpers/trimUtils";

export const UserCard = ({ user: { photo, position, name, email, phone } }: { user: User }) => {
  const truncatedEmail = getTruncatedText(email);
  const truncatedName = getTruncatedText(name);

  return (
    <li className={styles.userCard}>
      <img className={styles.userAvatar} width={70} height={70} src={photo} alt={name} />
      <p
        title={name}
        className={
          name.length > LENGTH_TO_TRIM ? `${styles.tooltip} ${styles.title}` : styles.title
        }
      >
        {truncatedName}
      </p>
      <div>
        <p>{position}</p>
        <a
          className={
            email.length > LENGTH_TO_TRIM ? `${styles.tooltip} ${styles.title}` : styles.title
          }
          href={`mailto:${email}`}
          title={email}
        >
          {truncatedEmail}
        </a>
        <a className={styles.title} href={`tel:${phone}`}>
          {phone}
        </a>
      </div>
    </li>
  );
};
