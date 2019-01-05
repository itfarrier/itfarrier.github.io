import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const Blog: React.SFC<IPage> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    {edges.map(({ node: { excerpt, fields: { slug }, frontmatter: { date, title } } }) => (
      <article key={slug}>
        <header>
          <h3>
            <Link to={`/blog${slug}`}>{title}</Link>
          </h3>
        </header>
        <time dateTime={date}>{date}</time>
        <section dangerouslySetInnerHTML={{ __html: excerpt }} />
      </article>
    ))}
  </Layout>
);

export default ({ children }) => {
  const render = (data) => <Blog children={children} data={data} />;

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
