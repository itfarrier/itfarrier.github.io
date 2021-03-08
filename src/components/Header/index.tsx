import * as React from 'react';

// @ts-ignore
import cv from '../../assets/documents/cv-podabed.pdf';

import { HeaderView } from './HeaderView';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = (props) => {
  const { homeLink, langsMenu } = props;

  return <HeaderView langsMenu={langsMenu} links={[homeLink, cv, `${homeLink}wishlist`]} />;
};

export default Header;
