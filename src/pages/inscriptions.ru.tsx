import React, { FC } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Layout } from 'cmpts/Layout';

const Inscriptions: FC = (props) => {
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
          <h1>{'Надписи'}</h1>
        </header>
        <section>{images}</section>
      </article>
    </Layout>
  );
};

export default Inscriptions;
