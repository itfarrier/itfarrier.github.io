import type { HTMLAttributes, LinkHTMLAttributes, MetaHTMLAttributes } from 'react';

export type HeadViewProps = {
  androidChromeIcons: JSX.Element[];
  appleTouchIcons: JSX.Element[][];
  description: MetaHTMLAttributes<HTMLMetaElement>['content'];
  favicons: JSX.Element[];
  href: LinkHTMLAttributes<HTMLLinkElement>['href'];
  keywords: MetaHTMLAttributes<HTMLMetaElement>['content'];
  language: HTMLAttributes<HTMLHtmlElement>['lang'];
  title: MetaHTMLAttributes<HTMLMetaElement>['content'];
};
