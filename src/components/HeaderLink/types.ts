import type { GatsbyLinkProps } from 'gatsby';

export type Link = GatsbyLinkProps<unknown>['to'];

export type HeaderLinkProps = { text: string; to: Link };
