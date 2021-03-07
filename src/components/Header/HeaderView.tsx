import { Link } from 'gatsby';
import * as React from 'react';

import SelectLanguage from '../SelectLanguage';
import { HeaderViewProps } from './types';

export const HeaderView: React.FC<HeaderViewProps> = (props) => {
  const {
    // TODO: add types
    langsMenu,
    links,
    toggleLanguage,
  } = props;

  return (
    <header>
      <nav>
        <SelectLanguage langsMenu={langsMenu} toggleLanguage={toggleLanguage} />
      </nav>
      <nav role={'navigation'}>
        <ul>
          <li>
            <Link role={'link'} to={links[0]}>
              {'/'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={links[1]}>
              {'/cv'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={links[2]}>
              {'/wishlist'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
