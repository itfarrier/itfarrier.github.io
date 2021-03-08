import { GatsbyLinkProps } from 'gatsby';

import { ILangObject } from '../../interfaces';

export type Link = GatsbyLinkProps<unknown>['to'];

export type HeaderViewProps = {
  langsMenu: ILangObject[];
  links: [home: Link, cv: Link, wishlist: Link];
};

export type HeaderProps = Pick<HeaderViewProps, 'langsMenu'> & { homeLink: Link };
