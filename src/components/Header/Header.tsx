import { Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import SelectLanguage from '../SelectLanguage';

import * as styles from './Header.module.css';

const Header: React.FC = (props) => {
  const {
    context: { isDark, toggleDark },
    homeLink,
    langsMenu,
  } = props;

  return (
    <header>
      <Helmet htmlAttributes={{ theme: isDark ? 'dark' : 'light' }} />
      <label htmlFor='darkMode'>Dark mode</label>
      <input checked={isDark} name='darkMode' onChange={toggleDark} type='checkbox' />
      <SelectLanguage langsMenu={langsMenu} />
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to={homeLink}>
              /
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link
              activeClassName={styles.activeLink}
              className={styles.link}
              to={`${homeLink}blog`}
            >
              /blog
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link
              activeClassName={styles.activeLink}
              className={styles.link}
              to={`${homeLink}books`}
            >
              /books
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link
              activeClassName={styles.activeLink}
              className={styles.link}
              to={`${homeLink}inscriptions`}
            >
              /inscriptions
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link
              activeClassName={styles.activeLink}
              className={styles.link}
              to={`${homeLink}video`}
            >
              /video
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link
              activeClassName={styles.activeLink}
              className={styles.link}
              to={`${homeLink}wishlist`}
            >
              /wishlist
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link
              activeClassName={styles.activeLink}
              className={styles.link}
              to={`${homeLink}about`}
            >
              /about
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
