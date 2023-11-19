import { Layout } from 'cmpts/Layout';
import { SSRGuardedBitTorrentVisualization } from 'cmpts/SSRGuardedBitTorrentVisualization';
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
      <SSRGuardedBitTorrentVisualization
        fallbackBitTorrentVisualization={<h1>{'BitTorrent скетч не загрузился.'}</h1>}
        fallbackSuspense={<h1>{'BitTorrent визуализация не загрузилась.'}</h1>}
        footerText={'Утащил с https://openprocessing.org/sketch/737873'}
      />
    </Layout>
  );
};

export default BittorrentVisualization;
