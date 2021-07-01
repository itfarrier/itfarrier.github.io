import { FC } from 'react';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { IPage } from 'src/interfaces';

import { Layout } from 'cmpts/Layout';

const PageTemplate: FC<IPage> = (props) => {
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
  query ($slug: String!) {
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
