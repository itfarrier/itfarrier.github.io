import { Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import Context from '../Context';

import * as styles from './Header.module.css';

const Header: React.FC = ({ langsMenu }) => {
  const { link } = langsMenu.find((languageObject) => languageObject.selected === true);

  return (
    <Context.Consumer>
      {(theme) => (
        <header>
          <Helmet htmlAttributes={{ theme: theme.isDark ? 'dark' : 'light' }} />
          <input checked={theme.isDark} onChange={theme.toggleDark} type='checkbox' />
          <nav>
            <ul className={styles.menu}>
              <li className={styles.menuElement}>
                <Link activeClassName={styles.activeLink} className={styles.link} to={link}>
                  /
                </Link>
              </li>
              <li className={styles.menuElement}>
                <Link
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={`${link}blog`}
                >
                  /blog
                </Link>
              </li>
              <li className={styles.menuElement}>
                <Link
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={`${link}books`}
                >
                  /books
                </Link>
              </li>
              <li className={styles.menuElement}>
                <Link
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={`${link}inscriptions`}
                >
                  /inscriptions
                </Link>
              </li>
              <li className={styles.menuElement}>
                <Link
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={`${link}video`}
                >
                  /video
                </Link>
              </li>
              <li className={styles.menuElement}>
                <Link
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={`${link}wishlist`}
                >
                  /wishlist
                </Link>
              </li>
              <li className={styles.menuElement}>
                <Link
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={`${link}about`}
                >
                  /about
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </Context.Consumer>
  );
};

export default Header;
