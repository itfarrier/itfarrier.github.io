import { graphql } from 'gatsby';
import { Link, withI18next } from 'gatsby-plugin-i18next';
import * as React from 'react';
import Helmet from 'react-helmet';
import { I18n, translate } from 'react-i18next';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const BlogPostTemplate: React.SFC<IPage> = ({
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
  <I18n>
    {(t) => (
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
                  <Link to={`/blog${previous.fields.slug}`} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                </li>
              )}
              {next && (
                <li>
                  <Link to={`/blog${next.fields.slug}`} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                </li>
              )}
            </ul>
          )}
        </article>
      </Layout>
    )}
  </I18n>
);

export const BlogPostTemplateQuery = graphql`
  query($lng: String!, $slug: String!) {
    locales: allLocale(filter: { lng: { eq: $lng }, ns: { eq: "messages" } }) {
      ...TranslationFragment
    }
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

export default withI18next()(BlogPostTemplate);
