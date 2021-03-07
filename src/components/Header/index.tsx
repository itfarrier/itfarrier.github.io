import * as React from 'react';

import cv from '../../assets/documents/cv-podabed.pdf';
import { HeaderView } from './HeaderView';
import { useContext } from 'react';
import Context from '../Context';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = (props) => {
  const { homeLink, langsMenu } = props;

  const { toggleLanguage } = useContext(Context);

  return (
    <HeaderView
      langsMenu={langsMenu}
      links={[homeLink, cv, `${homeLink}wishlist`]}
      toggleLanguage={toggleLanguage}
    />
  );
};

export default Header;
