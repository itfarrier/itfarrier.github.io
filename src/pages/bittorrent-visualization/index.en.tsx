import { Layout } from 'cmpts/Layout';
import { SSRGuardedBitTorrentVisualization } from 'cmpts/SSRGuardedBitTorrentVisualization';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { type BittorrentVisualizationEnQuery } from 'root/graphql-types';

const BittorrentVisualization = () => {
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
      <Helmet title={`${data.site.siteMetadata.title} — BitTorrent Visualization`} />
      <SSRGuardedBitTorrentVisualization
        fallbackBitTorrentVisualization={<h1>{'No BitTorrent sketch, sorry.'}</h1>}
        fallbackSuspense={<h1>{'No BitTorrent visualization, sorry.'}</h1>}
        footerText={'Forked from https://newroman.net/bittorrent'}
      />
    </Layout>
  );
};

export default BittorrentVisualization;
