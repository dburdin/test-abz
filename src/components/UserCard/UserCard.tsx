import styles from "./UserCard.module.scss";

import { User } from "../../interfaces/interfaces";
import { getTruncatedEmail, getEmailClass } from "../../helpers/emailUtils";

export const UserCard = ({ user: { photo, position, name, email, phone } }: { user: User }) => {
  const emailClass = getEmailClass(email);
  const truncatedEmail = getTruncatedEmail(email);

  return (
    <li className={styles.userCard}>
      <img className={styles.userAvatar} width={70} height={70} src={photo} alt={name} />
      <p className={styles.userName}>{name}</p>
      <div>
        <p>{position}</p>
        <a className={emailClass} href={`mailto:${email}`} title={email}>
          {truncatedEmail}
        </a>
        <a className={styles.title} href={`tel:${phone}`}>
          {phone}
        </a>
      </div>
    </li>
  );
};
