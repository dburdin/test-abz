import { Dispatch, useEffect, useState } from "react";

import styles from "./SignUpSection.module.scss";

import { User } from "../../types/types";

import { USERS_ENDPOINT } from "../../consts/consts";

import { FetchData } from "../../api/api";

import { SignUpForm } from "../SignUpForm";

export const SignUpSection = ({
  setUsers,
}: {
  setUsers: Dispatch<React.SetStateAction<User[]>>;
}) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (status) {
      getUpdatedUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const getUpdatedUsers = async () => {
    try {
      const response = await FetchData(USERS_ENDPOINT, { count: 6 });
      const data = response.data;
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <section id="sign-up" className={styles.signUpSection}>
      <div className="global-container">
        <h2>Working with POST request</h2>
        {status ? (
          <div>
            <h2 className={styles.registeredHeading}>User successfully registered</h2>
            <img width={328} src="/svg/success-image.svg" alt="registered successfully" />
          </div>
        ) : (
          <SignUpForm setStatus={setStatus} />
        )}
      </div>
    </section>
  );
};
