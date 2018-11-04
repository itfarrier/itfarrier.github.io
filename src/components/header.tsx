import { Link } from 'gatsby';
import * as React from 'react';

import styles from './header.module.css';

import { IHeader } from '../interfaces';

const Header: React.SFC<IHeader> = (props, context) => {
  const { themeIsDark, toggleTheme } = props;

  console.log(props, context);

  return (
    <header>
      <input type="checkbox" value={themeIsDark} onChange={toggleTheme} />
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/">
              /
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/blog">
              /blog
            </Link>
          </li>
          {/* <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/books">
              /books
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/inscriptions">
              /inscriptions
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/video">
              /video
            </Link>
          </li>
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/wishlist">
              /wishlist
            </Link>
          </li> */}
          <li className={styles.menuElement}>
            <Link activeClassName={styles.activeLink} className={styles.link} to="/about">
              /about
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
