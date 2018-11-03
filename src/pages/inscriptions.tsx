import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const Inscriptions: React.SFC<IPage> = ({
  data: {
    allFile: { edges },
  },
}) => {
  const images = edges.map(({ node: { childImageSharp: { fluid }, id } }) => (
    <Img fluid={fluid} key={id} />
  ));

  return (
    <Layout>
      <article>
        <header>
          <h1>Inscriptions</h1>
        </header>
        <section>{images}</section>
      </article>
    </Layout>
  );
};

export default ({ children }) => {
  const render = (data) => <Inscriptions children={children} data={data} />;

  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={render}
    />
  );
};
