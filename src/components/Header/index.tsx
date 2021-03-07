import * as React from 'react';

import cv from '../../assets/documents/cv-podabed.pdf';
import { HeaderView } from './HeaderView';

const Header: React.FC = (props: any): React.ReactElement => {
  const {
    context: { toggleLanguage },
    homeLink,
    langsMenu,
  } = props;

  return (
    <HeaderView
      langsMenu={langsMenu}
      links={[homeLink, cv, `${homeLink}wishlist`]}
      toggleLanguage={toggleLanguage}
    />
  );
};

export default Header;
