import { Link } from 'gatsby';
import * as React from 'react';

import { IHeader } from '../interfaces';

const Header: React.SFC<IHeader> = () => (
  <header>
    <menu>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/books">Books</Link>
      </li>
      <li>
        <Link to="/video">Video</Link>
      </li>
      <li>
        <Link to="/wishlist">Wishlist</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </menu>
  </header>
);

export default Header;
