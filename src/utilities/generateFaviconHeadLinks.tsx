export type GenerateFaviconHeadLinks = (fromSizesInPx: number[]) => JSX.Element[];

export const generateFaviconHeadLinks: GenerateFaviconHeadLinks = (fromSizesInPx) => {
  return fromSizesInPx.map((size) => (
    <link
      href={`/favicons/favicon-${size}x${size}.png`}
      key={size}
      rel={'icon'}
      sizes={`${size}x${size}`}
      type={'image/png'}
    />
  ));
};
