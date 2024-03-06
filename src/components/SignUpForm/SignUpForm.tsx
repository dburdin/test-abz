import styles from "./SignUpForm.module.scss";

// import { useFormik } from "formik";

export const SignUpForm = () => {
  //   const formik = useFormik({
  //     initialValues: {
  //       name: "",
  //       email: "",
  //       phone: "",
  //       photo: "",
  //       positionId: "",
  //     },
  //     onSubmit: () => {},
  //   });

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
        <p className={styles.tip}>+38 (XXX) XXX - XX - XX</p>
      </div>

      <div className={styles.radioContainer}>
        <p className={styles.radioTitle}>Select your position</p>
        <label className={styles.radioLabel}>
          <input className={styles.visuallyHidden} type="radio" value="id" />
          <span className={styles.outerCircle}></span>
          <span className={styles.innerCircle}></span>
          <span className={styles.radioLabelText}>Fron End Dev</span>
        </label>
      </div>

      <div className={styles.upload}>
        <div className={styles.uploadContainer}>
          <label className={styles.uploadLabel} htmlFor="photo">
            Upload
          </label>
          <div className={styles.uploadInputContainer}>
            <input
              className={`${styles.visuallyHidden} ${styles.uploadInput}`}
              type="file"
              id="photo"
              name="photo"
              accept=".jpg, .jpeg, .png"
            />
            <p className={styles.uploadTip}>Upload your photo</p>
          </div>
        </div>
      </div>
      <button className={`${styles.submitButton}`}>Sign Up</button>
    </form>
  );
};
