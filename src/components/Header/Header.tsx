import { Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import cv from '../../assets/documents/cv-podabed.pdf';
import SelectLanguage from '../SelectLanguage';

const Header: React.FC = (props: any): React.ReactElement => {
  const {
    context: { isDark, language, toggleDark, toggleLanguage },
    homeLink,
    langsMenu,
  } = props;

  const theme = isDark ? 'dark' : 'light';

  return (
    <header>
      <Helmet htmlAttributes={{ theme }} />
      <button onClick={toggleDark}>{theme}</button>
      <SelectLanguage langsMenu={langsMenu} language={language} toggleLanguage={toggleLanguage} />
      <nav>
        <ul>
          <li>
            <Link to={homeLink}>/</Link>
          </li>
          <li>
            <a href={cv}>/cv</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
