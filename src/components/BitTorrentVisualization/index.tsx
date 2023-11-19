import { type P5WrapperProps, ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from 'cmpts/BitTorrentVisualization/sketch';

export const BitTorrentVisualization = ({
  fallback,
  footerText,
}: P5WrapperProps & { footerText: HTMLSpanElement['children'] }) => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1,
      }}
    >
      <ReactP5Wrapper fallback={fallback} sketch={sketch} />
      <span style={{ bottom: '1rem', position: 'absolute', right: '1rem' }}>{footerText}</span>
    </div>
  );
};
