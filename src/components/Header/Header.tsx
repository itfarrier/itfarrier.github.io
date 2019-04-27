import { Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import cv from '../../assets/files/cv.pdf';
import SelectLanguage from '../SelectLanguage';
import * as styles from './Header.module.css';

const Header: React.FC = (props) => {
  const {
    context: { isDark, toggleDark, toggleLanguage },
    homeLink,
    langsMenu,
  } = props;

  const theme = isDark ? 'dark' : 'light';

  return (
    <header>
      <Helmet htmlAttributes={{ theme }} />
      <button className={styles.themeChangeButton} onClick={toggleDark}>
        {theme}
      </button>
      <SelectLanguage langsMenu={langsMenu} toggleLanguage={toggleLanguage} />
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to={homeLink}>
              /
            </Link>
          </li>
          <li className={styles.menuElement}>
            <a className={styles.link} href={cv}>
              /cv
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
