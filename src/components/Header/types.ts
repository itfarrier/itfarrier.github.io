import type { HeaderLinkProps } from 'cmpts/HeaderLink/types';

export interface HeaderViewProps {
  links: { text: HeaderLinkProps['text']; to: HeaderLinkProps['to'] }[];
}
