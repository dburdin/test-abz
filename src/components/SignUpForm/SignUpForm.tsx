import styles from "./SignUpForm.module.scss";

import { useFormik } from "formik";

export const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      photo: "",
      positionId: "",
    },
    onSubmit: () => {},
  });

  return (
    <form className={styles.signUpForm}>
      <div className={styles.inputContainer}>
        <input className={styles.input} type="text" id="name" name="name" maxLength={50} />
        <label className={styles.placeholder} htmlFor="name">
          Name
        </label>
      </div>

      <div className={styles.inputContainer}>
        <input className={styles.input} type="email" id="email" name="email" />
        <label className={styles.placeholder} htmlFor="email">
          Email
        </label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.input} type="phone" id="phone" name="phone" />
        <label className={styles.placeholder} htmlFor="phone">
          Phone
        </label>
      </div>
    </form>
  );
};
