import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import 'normalize.css';

import { Context } from 'cmpts/Context';
import { Head } from 'cmpts/Head';
import { Header } from 'cmpts/Header';
import { LayoutViewProps } from 'cmpts/Layout/types';

export const LayoutView: FC<LayoutViewProps> = (props) => {
  const { children, homeLink, href, i18nMessages, langsMenu, locale } = props;

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
