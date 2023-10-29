import type { HeadViewProps } from 'cmpts/Head/types';
import type { FC } from 'react';

import { Helmet } from 'react-helmet';
import { COLORS } from 'src/constants';

export const HeadView: FC<HeadViewProps> = (props) => {
  const { androidChromeIcons, appleTouchIcons, description, favicons, href, keywords, language, title } = props;

  return (
    <Helmet>
      <html dir={'ltr'} lang={language} />
      <link
        href={'/favicons/apple-touch-icon-precomposed.png'}
        rel={'apple-touch-icon'}
        sizes={'180x180'}
        type={'image/png'}
      />
      <link href={'/favicons/apple-touch-icon.png'} rel={'apple-touch-icon'} sizes={'180x180'} type={'image/png'} />
      <link color={COLORS.RGBA_0_0_0_100} href={'/favicons/safari-pinned-tab.svg'} rel={'mask-icon'} />
      <link href={'/favicons/favicon.ico'} rel={'shortcut icon'} />
      <link href={href} hrefLang={language} rel={'alternate'} />
      <link href={href} rel={'canonical'} />
      <meta content={COLORS.RGBA_255_255_255_100} name={'msapplication-TileColor'} />
      <meta content={COLORS.RGBA_255_255_255_100} name={'theme-color'} />
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
      {androidChromeIcons}
      {appleTouchIcons}
      {favicons}
    </Helmet>
  );
};
