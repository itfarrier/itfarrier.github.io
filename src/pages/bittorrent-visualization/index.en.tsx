import { ReactP5Wrapper } from '@p5-wrapper/react';
import { Layout } from 'cmpts/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import { type FC } from 'react';
import { Helmet } from 'react-helmet';
import { type BittorrentVisualizationEnQuery } from 'root/graphql-types';

import { sketch } from './sketch';

const BittorrentVisualization: FC = () => {
  const data = useStaticQuery<BittorrentVisualizationEnQuery>(graphql`
    query BittorrentVisualizationEn {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Layout>
      <Helmet title={`${data.site.siteMetadata.title} — Bittorrent Visualization`} />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ReactP5Wrapper fallback={<h1>{'No Bittorrent visualization, sorry.'}</h1>} sketch={sketch} />
      </div>
    </Layout>
  );
};

export default BittorrentVisualization;
