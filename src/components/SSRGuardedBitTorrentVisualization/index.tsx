import { type BitTorrentVisualizationProps } from 'cmpts/BitTorrentVisualization';
import { lazy, Suspense, type SuspenseProps } from 'react';

const LazyLoadedBitTorrentVisualization = lazy(() => import('cmpts/BitTorrentVisualization'));

export interface SSRGuardedBitTorrentVisualization {
  fallbackBitTorrentVisualization: BitTorrentVisualizationProps['fallback'];
  fallbackSuspense: SuspenseProps['fallback'];
  footerTextBitTorrentVisualization: BitTorrentVisualizationProps['footerText'];
}

export const SSRGuardedBitTorrentVisualization = ({
  fallbackBitTorrentVisualization,
  fallbackSuspense,
  footerTextBitTorrentVisualization,
}: SSRGuardedBitTorrentVisualization) => {
  const isSSR = typeof window === 'undefined';

  return (
    <>
      {!isSSR && (
        <Suspense fallback={<span>{fallbackSuspense}</span>}>
          <LazyLoadedBitTorrentVisualization
            fallback={fallbackBitTorrentVisualization}
            footerText={footerTextBitTorrentVisualization}
          />
        </Suspense>
      )}
    </>
  );
};
