import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';

const BlogPostTemplate: React.SFC = ({
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
      htmlAttributes={{ lang: 'en' }}
      meta={[{ name: 'description', content: excerpt }]}
      title={`${frontmatter.title} | ${title}`}
    />
    <h1>{frontmatter.title}</h1>
    <p>{date}</p>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <hr />
    <ul>
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  </Layout>
);

export const BlogPostTemplateQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default BlogPostTemplate;
