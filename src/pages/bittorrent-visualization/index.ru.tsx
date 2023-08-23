import { type FC } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout } from 'cmpts/Layout';
import { type BittorrentVisualizationRuQuery } from 'root/graphql-types';

const BittorrentVisualization: FC = () => {
  const data = useStaticQuery<BittorrentVisualizationRuQuery>(graphql`
    query BittorrentVisualizationRu {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Layout>
      <Helmet title={`${data.site.siteMetadata.title} — Bittorrent Визуализация`} />
    </Layout>
  );
};

export default BittorrentVisualization;
