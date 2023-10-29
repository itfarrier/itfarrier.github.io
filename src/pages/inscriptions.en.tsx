import type { FC } from 'react';
import type { InscriptionsEnQuery } from 'root/graphql-types';

import { Layout } from 'cmpts/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

const Inscriptions: FC = () => {
  const data = useStaticQuery<InscriptionsEnQuery>(graphql`
    query InscriptionsEn {
      allFile(filter: { relativeDirectory: { eq: "images/inscriptions" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            name
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const images = data.allFile.edges.map((edge) => {
    const { childImageSharp, name } = edge.node;

    return <GatsbyImage alt={name} image={childImageSharp.gatsbyImageData} key={name} />;
  });

  return (
    <Layout>
      <Helmet title={`${data.site.siteMetadata.title} — Inscriptions`} />
      <article>
        <header>
          <h1>{'Inscriptions'}</h1>
        </header>
        <section>{images}</section>
      </article>
    </Layout>
  );
};

export default Inscriptions;
