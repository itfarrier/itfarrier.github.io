import { FC } from 'react';

import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import type { PageTemplateQuery as PageTemplateQueryType } from 'root/graphql-types';

import { Layout } from 'cmpts/Layout';

const PageTemplate: FC<PageProps<PageTemplateQueryType>> = (props) => {
  const {
    data: {
      markdownRemark: {
        excerpt,
        frontmatter,
        frontmatter: { title },
        html,
      },
      site: { siteMetadata },
    },
    location,
  } = props;

  return (
    <Layout location={location}>
      <Helmet
        meta={[{ content: excerpt, name: 'description' }]}
        title={`${siteMetadata.title} — ${title}`}
      />
      <article>
        <header>
          <h1>{frontmatter.title}</h1>
        </header>
        <main dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
};

export const PageTemplateQuery = graphql`
  query PageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      fields {
        langKey
        slug
      }
      frontmatter {
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

export default PageTemplate;
