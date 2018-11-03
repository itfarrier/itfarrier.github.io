import { Link } from 'gatsby';
import * as React from 'react';

import styles from './header.module.css';

import { IHeader } from '../interfaces';

const Header: React.SFC<IHeader> = () => (
  <header>
    <nav>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/">
            /
          </Link>
        </li>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/blog">
            /blog
          </Link>
        </li>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/books">
            /books
          </Link>
        </li>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/inscriptions">
            /inscriptions
          </Link>
        </li>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/video">
            /video
          </Link>
        </li>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/wishlist">
            /wishlist
          </Link>
        </li>
        <li className={styles.item}>
          <Link activeClassName={styles.activeItem} to="/about">
            /about
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
