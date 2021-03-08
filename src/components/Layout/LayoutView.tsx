import * as React from 'react';
import { IntlProvider } from 'react-intl';

import 'normalize.css';

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
            <Header homeLink={homeLink} langsMenu={langsMenu} />
            <main>{children}</main>
          </>
        )}
      </Context.Consumer>
    </IntlProvider>
  );
};
