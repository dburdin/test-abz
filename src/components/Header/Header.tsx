import style from "./Header.module.scss";
import logo from "/svg/logo.svg";

export const Header = () => {
  return (
    <header className={style.header} datatype="header">
      <div className={`${style.headerContainer} global-container`}>
        <a href="/">
          <img width={104} src={logo} alt="a face of the painted cat, logo" />
        </a>
        <nav className={style.navContainer}>
          <a className={style.navButton} href="#users">
            Users
          </a>
          <a className={style.navButton} href="#sign-up">
            Sign up
          </a>
        </nav>
      </div>
    </header>
  );
};
