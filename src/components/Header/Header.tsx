import { Link } from 'gatsby';
import * as React from 'react';

import cv from '../../assets/documents/cv-podabed.pdf';
import SelectLanguage from '../SelectLanguage';

const Header: React.FC = (props: any): React.ReactElement => {
  const {
    context: { language, toggleLanguage },
    homeLink,
    langsMenu,
  } = props;

  return (
    <header>
      <nav>
        <SelectLanguage langsMenu={langsMenu} language={language} toggleLanguage={toggleLanguage} />
      </nav>
      <nav role={'navigation'}>
        <ul>
          <li>
            <Link role={'link'} to={homeLink}>
              {'/'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={cv}>
              {'/cv'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={`${homeLink}wishlist`}>
              {'/wishlist'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
