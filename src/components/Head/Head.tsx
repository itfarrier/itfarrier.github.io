import * as React from 'react';
import { Helmet } from 'react-helmet';

const Head: React.FC = (props: any): React.ReactElement => {
  const {
    context: { language },
    i18nMessages: { description, keywords, title },
    location: { href },
  } = props;

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
  // const variantOfPageTitle: string = subPage
  //   ? `${title} — ${description} — ${page} — ${subPage}`
  //   : page
  //   ? `${title} — ${description} — ${page}`
  //   : `${title} — ${description}`;

  return (
    <Helmet>
      <html dir={'ltr'} lang={language} />
      <link
        href={'/favicons/apple-touch-icon-precomposed.png'}
        rel={'apple-touch-icon'}
        sizes={'180x180'}
        type={'image/png'}
      />
      <link
        href={'/favicons/apple-touch-icon.png'}
        rel={'apple-touch-icon'}
        sizes={'180x180'}
        type={'image/png'}
      />
      <link color={'#000'} href={'/favicons/safari-pinned-tab.svg'} rel={'mask-icon'} />
      <link href={'/favicons/favicon.ico'} rel={'shortcut icon'} />
      <link href={href} hrefLang={language} rel={'alternate'} />
      <link href={href} rel={'canonical'} />
      <meta content={'#fff'} name={'msapplication-TileColor'} />
      <meta content={'#fff'} name={'theme-color'} />
      <meta content={'/favicons/android-chrome-512x512.png'} name={'twitter:image'} />
      <meta content={'/favicons/android-chrome-512x512.png'} property={'og:image'} />
      <meta content={'/favicons/browserconfig.xml'} name={'msapplication-config'} />
      <meta content={'/favicons/mstile-144x144.png'} name={'msapplication-TileImage'} />
      <meta content={'512'} property={'og:image:height'} />
      <meta content={'512'} property={'og:image:width'} />
      <meta content={'@podabed'} name={'twitter:creator'} />
      <meta content={'@podabed'} name={'twitter:site'} />
      <meta content={'black-translucent'} name={'apple-mobile-web-app-status-bar-style'} />
      <meta content={'summary'} name={'twitter:card'} />
      <meta content={'website'} property={'og:type'} />
      <meta content={'yes'} name={'apple-mobile-web-app-capable'} />
      <meta content={href} name={'twitter:url'} />
      <meta content={href} property={'og:url'} />
      <meta content={description} name={'description'} />
      <meta content={description} name={'twitter:description'} />
      <meta content={description} property={'og:description'} />
      <meta content={keywords} name={'keywords'} />
      <meta content={title} name={'apple-mobile-web-app-title'} />
      <meta content={title} name={'application-name'} />
      <meta content={title} name={'twitter:title'} />
      <meta content={title} property={'og:site_name'} />
      <meta content={title} property={'og:title'} />
      <meta content={language} property={'og:locale'} />
      <title>{title}</title>
      {generateAndroidChrome([36, 48, 72, 96, 144, 192, 256, 384, 512])}
      {generateAppleTouch([57, 60, 72, 76, 114, 120, 144, 152, 180])}
      {generateFavicon([16, 32])}
    </Helmet>
  );
};

export default Head;
