import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';

import Layout from '../components/Layout';

const Blog: React.FC = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    {
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
  `);
  const articleList = edges.map(
    ({
      node: {
        excerpt,
        fields: { slug },
        frontmatter: { date, title },
      },
    }) => (
      <article key={slug}>
        <header>
          <h3>
            <Link to={slug}>{title}</Link>
          </h3>
        </header>
        <time dateTime={date}>{date}</time>
        <section dangerouslySetInnerHTML={{ __html: excerpt }} />
      </article>
    ),
  );

  return <Layout>{articleList}</Layout>;
};

export default Blog;
