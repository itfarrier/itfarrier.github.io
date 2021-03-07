import 'normalize.css';
import * as React from 'react';
import { IntlProvider } from 'react-intl';

import Context from '../Context';
import Head from '../Head';
import Header from '../Header';
import { LayoutViewProps } from './types';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const { children, href, homeLink, i18nMessages, langsMenu, locale } = props;

  return (
    <IntlProvider locale={locale} messages={i18nMessages}>
      <Context.Consumer>
        {() => (
          <>
            <Head href={href} i18nMessages={i18nMessages} {...props} />
            <Header homeLink={homeLink} langsMenu={langsMenu} locale={locale} />
            <main>{children}</main>
          </>
        )}
      </Context.Consumer>
    </IntlProvider>
  );
};
