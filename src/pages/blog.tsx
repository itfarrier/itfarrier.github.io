import { graphql } from 'gatsby';
import { Link, withI18next } from 'gatsby-plugin-i18next';
import * as React from 'react';
import { I18n, translate } from 'react-i18next';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const Blog: React.SFC<IPage> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <I18n>
    {(t) => (
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
    )}
  </I18n>
);

export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng }, ns: { eq: "messages" } }) {
      ...TranslationFragment
    }
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
`;

export default withI18next()(Blog);
