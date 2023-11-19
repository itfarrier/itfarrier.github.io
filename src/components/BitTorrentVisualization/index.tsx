import { type P5WrapperProps, ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from 'cmpts/BitTorrentVisualization/sketch';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

export interface BitTorrentVisualizationProps {
  fallback: P5WrapperProps['fallback'];
  footerText: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>['children'];
}

const BitTorrentVisualization = ({ fallback, footerText }: BitTorrentVisualizationProps) => {
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

export default BitTorrentVisualization;
