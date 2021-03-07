import * as React from 'react';
import { HeadView } from './HeadView';

const Head: React.FC = (props) => {
  const {
    // TODO: add types
    context: { language },
    i18nMessages: { description, keywords, title },
    location: { href },
  } = props;

  const generateAndroidChrome = (sizesInPx: number[]) => {
    return sizesInPx.map((size: number) => {
      return (
        <link
          href={`/favicons/android-chrome-${size}x${size}.png`}
          key={size}
          rel={'icon'}
          sizes={`${size}x${size}`}
          type={'image/png'}
        />
      );
    });
  };

  const generateAppleTouch = (sizesInPx: number[]) => {
    return sizesInPx.map((size: number) => [
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
    ]);
  };

  const generateFavicon = (sizesInPx: number[]) => {
    return sizesInPx.map((size: number) => (
      <link
        href={`/favicons/favicon-${size}x${size}.png`}
        key={size}
        rel={'icon'}
        sizes={`${size}x${size}`}
        type={'image/png'}
      />
    ));
  };

  return (
    <HeadView
      androidChromeIcons={generateAndroidChrome([36, 48, 72, 96, 144, 192, 256, 384, 512])}
      appleTouchIcons={generateAppleTouch([57, 60, 72, 76, 114, 120, 144, 152, 180])}
      favicons={generateFavicon([16, 32])}
      description={description}
      href={href}
      keywords={keywords}
      language={language}
      title={title}
    />
  );
};

export default Head;
