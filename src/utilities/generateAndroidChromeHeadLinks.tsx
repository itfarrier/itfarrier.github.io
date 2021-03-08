import * as React from 'react';

export type GenerateAndroidChromeHeadLinks = (fromSizesInPx: number[]) => JSX.Element[];

export const generateAndroidChromeHeadLinks: GenerateAndroidChromeHeadLinks = (fromSizesInPx) => {
  return fromSizesInPx.map((size) => {
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
