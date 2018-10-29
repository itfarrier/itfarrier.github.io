import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const IndexPage: React.SFC<IPage> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Link to="/about">About</Link>
    {edges.map(({ node: { excerpt, fields: { slug }, frontmatter: { date, title } } }) => (
      <div key={slug}>
        <h3>
          <Link to={slug}>{title}</Link>
        </h3>
        <small>{date}</small>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    ))}
  </Layout>
);

export default () => {
  const render = (data) => <IndexPage data={data} />;

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "DD MMMM, YYYY")
                  title
                }
              }
            }
          }
        }
      `}
      render={render}
    />
  );
};
