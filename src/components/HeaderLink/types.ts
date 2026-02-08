import type { GatsbyLinkProps } from 'gatsby';

export interface HeaderLinkProps {
  text: string;
  to: Link;
}

export type Link = GatsbyLinkProps<unknown>['to'];
