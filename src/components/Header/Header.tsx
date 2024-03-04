import style from "./Header.module.scss";
import logo from "/svg/logo.svg";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={`${style.headerContainer} global-container`}>
        <a href="/">
          <img width={104} src={logo} alt="a face of the painted cat, logo" />
        </a>
        <nav className={style.navContainer}>
          <button className={style.navButton}>Users</button>
          <button className={style.navButton}>Sign up</button>
        </nav>
      </div>
    </header>
  );
};
