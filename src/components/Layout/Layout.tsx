import { graphql, useStaticQuery } from 'gatsby';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import { getCurrentLangKey, getLangs, getUrlForLang, isHomePage } from 'ptz-i18n';
import * as React from 'react';
import Helmet from 'react-helmet';
import { addLocaleData, FormattedMessage, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import { ILangObject } from '../../interfaces';
import Context from '../Context';
import Header from '../Header';

addLocaleData([...en, ...ru]);

const Layout: React.FC = (props: any): React.ReactElement => {
  const {
    children,
    location: { pathname },
  } = props;

  const {
    site: {
      siteMetadata: {
        languages: { defaultLangKey, langs },
        title,
      },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          languages {
            defaultLangKey
            langs
          }
          title
        }
      }
    }
  `);

  const langKey: string = getCurrentLangKey(langs, defaultLangKey, pathname);
  const homeLink: string = `/${langKey}/`;
  const langsMenu: ILangObject[] = getLangs(langs, langKey, getUrlForLang(homeLink, pathname));
  const i18nMessages: { [key: string]: string } = require(`../../data/messages/${langKey}`);
  const generateAndroidChrome = (sizesInPx: number[]): React.ReactElement[] => {
    return sizesInPx.map(
      (size: number): React.ReactElement => (
        <link
          href={`/favicons/android-chrome-${size}x${size}.png`}
          key={size}
          rel={'icon'}
          sizes={`${size}x${size}`}
          type={'image/png'}
        />
      ),
    );
  };
  const generateAppleTouch = (sizesInPx: number[]): React.ReactElement[][] => {
    return sizesInPx.map(
      (size: number): React.ReactElement[] => [
        <link
          href={`/favicons/apple-touch-icon-${size}x${size}.png`}
          key={`1${size}`}
          rel={'apple-touch-icon'}
          sizes={`${size}x${size}`}
          type={'image/png'}
        />,
        <link
          href={`/favicons/apple-touch-icon-${size}x${size}-precomposed.png`}
          key={`2${size}`}
          rel={'apple-touch-icon'}
          sizes={`${size}x${size}`}
          type={'image/png'}
        />,
      ],
    );
  };
  const generateFavicon = (sizesInPx: number[]): React.ReactElement[] => {
    return sizesInPx.map(
      (size: number): React.ReactElement => (
        <link
          href={`/favicons/favicon-${size}x${size}.png`}
          key={size}
          rel={'icon'}
          sizes={`${size}x${size}`}
          type={'image/png'}
        />
      ),
    );
  };

  return (
    <IntlProvider locale={langKey} messages={i18nMessages}>
      <Context.Consumer>
        {(context) => (
          <>
            <Helmet title={title}>
              {generateAndroidChrome([36, 48, 72, 96, 144, 192, 256, 384, 512])}
              <link
                href={'/favicons/apple-touch-icon.png'}
                rel={'apple-touch-icon'}
                sizes={'180x180'}
                type={'image/png'}
              />
              <link
                href={'/favicons/apple-touch-icon-precomposed.png'}
                rel={'apple-touch-icon'}
                sizes={'180x180'}
                type={'image/png'}
              />
              {generateAppleTouch([57, 60, 72, 76, 114, 120, 144, 152, 180])}
              {generateFavicon([16, 32])}
              <link color={'#000'} href={'/favicons/safari-pinned-tab.svg'} rel={'mask-icon'} />
              <link href={'/favicons/favicon.ico'} rel={'shortcut icon'} />
              <meta content={i18nMessages.description} name={'description'} />
              <meta content={i18nMessages.keywords} name={'keywords'} />
              <meta content={i18nMessages.title} name={'apple-mobile-web-app-title'} />
              <meta content={i18nMessages.title} name={'application-name'} />
              <meta content={'#fff'} name={'msapplication-TileColor'} />
              <meta content={'/favicons/mstile-144x144.png'} name={'msapplication-TileImage'} />
              <meta content={'/favicons/browserconfig.xml'} name={'msapplication-config'} />
              <meta content={'#fff'} name={'theme-color'} />
              <meta content={'black-translucent'} name={'apple-mobile-web-app-status-bar-style'} />
            </Helmet>
            <Header
              context={context}
              homeLink={homeLink}
              langsMenu={langsMenu}
              locale={langKey}
              pathname={pathname}
            />
            <main>{children}</main>
          </>
        )}
      </Context.Consumer>
    </IntlProvider>
  );
};

export default Layout;
