import React, { FC } from 'react';

import { Link } from 'gatsby';

import { HeaderViewProps } from 'cmpts/Header/types';
import { SelectLanguage } from 'cmpts/SelectLanguage';

export const HeaderView: FC<HeaderViewProps> = (props) => {
  const { langsMenu, links } = props;

  return (
    <header>
      <nav>
        <SelectLanguage langsMenu={langsMenu} />
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
