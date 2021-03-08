import React from 'react';

import { HeaderView } from 'cmpts/Header/HeaderView';
import { HeaderProps } from 'cmpts/Header/types';
import cv from 'docs/cv-podabed.pdf';

export const Header: React.FC<HeaderProps> = (props) => {
  const { homeLink, langsMenu } = props;

  return <HeaderView langsMenu={langsMenu} links={[homeLink, cv, `${homeLink}wishlist`]} />;
};
