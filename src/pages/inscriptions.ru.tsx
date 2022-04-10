import { FC } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

import { Layout } from 'cmpts/Layout';
import { InscriptionsRuQuery } from 'root/graphql-types';

const Inscriptions: FC = () => {
  const data = useStaticQuery<InscriptionsRuQuery>(graphql`
    query InscriptionsRu {
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
      <Helmet title={`${data.site.siteMetadata.title} — Надписи`} />
      <article>
        <header>
          <h1>{'Надписи'}</h1>
        </header>
        <section>{images}</section>
      </article>
    </Layout>
  );
};

export default Inscriptions;
