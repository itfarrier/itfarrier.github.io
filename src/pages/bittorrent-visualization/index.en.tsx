import { type FC } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout } from 'cmpts/Layout';
import { type BittorrentVisualizationEnQuery } from 'root/graphql-types';

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
    </Layout>
  );
};

export default BittorrentVisualization;
