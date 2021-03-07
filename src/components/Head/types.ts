import { HTMLAttributes, LinkHTMLAttributes, MetaHTMLAttributes } from 'react';
import { IntlProvider } from 'react-intl';

export type HeadViewProps = {
  androidChromeIcons: JSX.Element[];
  appleTouchIcons: JSX.Element[][];
  description: MetaHTMLAttributes<HTMLMetaElement>['content'];
  favicons: JSX.Element[];
  href:
    | LinkHTMLAttributes<HTMLLinkElement>['href']
    | MetaHTMLAttributes<HTMLMetaElement>['content'];
  keywords: MetaHTMLAttributes<HTMLMetaElement>['content'];
  language:
    | LinkHTMLAttributes<HTMLLinkElement>['hrefLang']
    | HTMLAttributes<HTMLHtmlElement>['lang'];
  title: MetaHTMLAttributes<HTMLMetaElement>['content'];
};

export type HeadProps = Pick<HeadViewProps, 'href'> & {
  i18nMessages: IntlProvider.Props['messages'];
};
