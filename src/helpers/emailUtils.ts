import styles from "../components/UserCard/UserCard.module.scss";

import { LENGTH_TO_TRIM } from "../consts/consts";

export const getEmailClass = (email: string): string => {
  return email.length > LENGTH_TO_TRIM ? `${styles.tooltip} ${styles.title}` : styles.title;
};

export const getTruncatedEmail = (email: string): string => {
  return email.length > LENGTH_TO_TRIM ? `${email.slice(0, LENGTH_TO_TRIM)}...` : email;
};
