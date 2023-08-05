import { FC } from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout } from 'cmpts/Layout';

const Blog: FC = () => {
  const {
    allMarkdownRemark: { edges },
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fields: { langKey: { eq: "ru" } }, frontmatter: { type: { ne: "page" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            excerpt
            fields {
              langKey
              slug
            }
            frontmatter {
              date(formatString: "DD MMMM, YYYY")
              title
            }
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

  const articleList = edges.map(
    ({
      node: {
        excerpt,
        fields: { slug },
        frontmatter: { date, title },
      },
    }) => {
      return (
        <article key={slug}>
          <header>
            <h3>
              <Link to={slug}>{title}</Link>
            </h3>
          </header>
          <time dateTime={date}>{date}</time>
          <section dangerouslySetInnerHTML={{ __html: excerpt }} />
        </article>
      );
    },
  );

  return (
    <Layout>
      <Helmet title={`${siteMetadata.title} — Блог`} />
      {articleList}
    </Layout>
  );
};

export default Blog;
