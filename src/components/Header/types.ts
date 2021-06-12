import { HeaderLinkProps } from 'cmpts/HeaderLink/types';

export type HeaderViewProps = {
  links: { text: HeaderLinkProps['text']; to: HeaderLinkProps['to'] }[];
};
