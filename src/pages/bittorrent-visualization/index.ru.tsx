import { BitTorrentVisualization } from 'cmpts/BitTorrentVisualization';
import { Layout } from 'cmpts/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { type BittorrentVisualizationRuQuery } from 'root/graphql-types';

const BittorrentVisualization = () => {
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
      <Helmet title={`${data.site.siteMetadata.title} — BitTorrent Визуализация`} />
      <BitTorrentVisualization
        fallback={<h1>{'BitTorrent не загрузилась, простите.'}</h1>}
        footerText={'Утащил с https://newroman.net/bittorrent'}
      />
    </Layout>
  );
};

export default BittorrentVisualization;
