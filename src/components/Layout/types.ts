import { IntlProvider } from 'react-intl';

import { HeadProps } from 'cmpts/Head/types';
import { HeaderProps } from 'cmpts/Header/types';
import { ILangObject } from 'src/interfaces';

export type LayoutViewProps = {
  homeLink: HeaderProps['homeLink'];
  href: HeadProps['href'];
  i18nMessages: IntlProvider.Props['messages'];
  langsMenu: ILangObject[];
  locale: IntlProvider.Props['locale'];
};

export type LayoutProps = { location: Location };
