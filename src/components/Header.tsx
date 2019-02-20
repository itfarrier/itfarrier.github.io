import { Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import Context from './Context';

import * as styles from './Header.module.css';

const Header: React.FC = () => (
  <Context.Consumer>
    {(theme) => (
      <header>
        <Helmet htmlAttributes={{ theme: theme.isDark ? 'dark' : 'light' }} />
        <input checked={theme.isDark} onChange={theme.toggleDark} type='checkbox' />
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/'>
                /
              </Link>
            </li>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/blog'>
                /blog
              </Link>
            </li>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/books'>
                /books
              </Link>
            </li>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/inscriptions'>
                /inscriptions
              </Link>
            </li>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/video'>
                /video
              </Link>
            </li>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/wishlist'>
                /wishlist
              </Link>
            </li>
            <li className={styles.menuElement}>
              <Link activeClassName={styles.activeLink} className={styles.link} to='/about'>
                /about
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )}
  </Context.Consumer>
);

export default Header;
