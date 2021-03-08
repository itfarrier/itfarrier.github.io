import { IntlProvider } from 'react-intl';

import { ILangObject } from '../../interfaces';
import { HeadProps } from '../Head/types';
import { HeaderProps } from '../Header/types';

export type LayoutViewProps = {
  homeLink: HeaderProps['homeLink'];
  href: HeadProps['href'];
  i18nMessages: IntlProvider.Props['messages'];
  langsMenu: ILangObject[];
  locale: IntlProvider.Props['locale'];
};

export type LayoutProps = { location: Location };
