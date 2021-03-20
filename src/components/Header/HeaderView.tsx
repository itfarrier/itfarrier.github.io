import { FC } from 'react';

import { Link } from 'gatsby';

import { HeaderViewProps } from 'cmpts/Header/types';
import { SelectLanguage } from 'cmpts/SelectLanguage';

export const HeaderView: FC<HeaderViewProps> = (props) => {
  const { links } = props;

  return (
    <header>
      <nav>
        <SelectLanguage />
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
          <li>
            <Link role={'link'} to={links[3]}>
              {'/blog'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={links[4]}>
              {'/inscriptions'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={links[5]}>
              {'/books'}
            </Link>
          </li>
          <li>
            <Link role={'link'} to={links[6]}>
              {'/videos'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
