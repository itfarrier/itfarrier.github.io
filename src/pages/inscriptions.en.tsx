import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';

import Layout from '../components/Layout';

const Inscriptions: React.FC = (props) => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    {
      allFile(filter: { relativeDirectory: { eq: "inscriptions" } }) {
        edges {
          node {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            id
          }
        }
      }
    }
  `);
  const images = edges.map(({ node: { childImageSharp: { fluid }, id } }) => (
    <Img fluid={fluid} key={id} />
  ));

  return (
    <Layout location={props.location}>
      <article>
        <header>
          <h1>Inscriptions</h1>
        </header>
        <section>{images}</section>
      </article>
    </Layout>
  );
};

export default Inscriptions;
