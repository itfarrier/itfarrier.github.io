import { GatsbyLinkProps } from 'gatsby';

export type Link = GatsbyLinkProps<unknown>['to'];

export type HeaderViewProps = {
  links: [home: Link, cv: Link, wishlist: Link];
};
