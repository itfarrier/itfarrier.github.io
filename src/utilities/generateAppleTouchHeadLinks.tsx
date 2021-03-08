import React from 'react';

export type GenerateAppleTouchHeadLinks = (
  fromSizesInPx: number[],
) => [normal: JSX.Element, precomposed: JSX.Element][];

export const generateAppleTouchHeadLinks: GenerateAppleTouchHeadLinks = (fromSizesInPx) => {
  return fromSizesInPx.map((size) => [
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
