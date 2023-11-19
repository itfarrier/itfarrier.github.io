import { type P5WrapperProps, ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from 'cmpts/BitTorrentVisualization/sketch';

export const BitTorrentVisualization = (props: P5WrapperProps) => {
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
      <ReactP5Wrapper fallback={props.fallback} sketch={sketch} />
    </div>
  );
};
