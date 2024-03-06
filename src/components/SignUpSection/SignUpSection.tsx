import styles from "./SignUpSection.module.scss";
import { SignUpForm } from "../SignUpForm";

export const SignUpSection = () => {
  return (
    <section id="sign-up" className={styles.signUpSection}>
      <div className="global-container">
        <h2>Working with POST request</h2>
        <SignUpForm />
      </div>
    </section>
  );
};
