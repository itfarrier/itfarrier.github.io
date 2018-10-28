import * as React from 'react';
import { Link } from 'gatsby';

import { IHeader } from '../interfaces';

const Header: React.SFC<IHeader> = ({ siteTitle }) => (
  <div>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  </div>
);

export default Header;
