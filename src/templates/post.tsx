import { graphql, Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const BlogPostTemplate: React.FC<IPage> = ({
  data: {
    markdownRemark: {
      excerpt,
      frontmatter,
      frontmatter: { date },
      html,
    },
    site: {
      siteMetadata: { title },
    },
  },
  pageContext: { next, previous },
}) => (
  <Layout>
    <Helmet
      meta={[{ name: 'description', content: excerpt }]}
      title={`${frontmatter.title} | ${title}`}
    />
    <article>
      <header>
        <h1>{frontmatter.title}</h1>
      </header>
      <time dateTime={date}>{date}</time>
      <section dangerouslySetInnerHTML={{ __html: html }} />
      {(next || previous) && (
        <ul>
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel='prev'>
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li>
              <Link to={next.fields.slug} rel='next'>
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      )}
    </article>
  </Layout>
);

export const BlogPostTemplateQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      fields {
        langKey
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      html
      id
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default BlogPostTemplate;
