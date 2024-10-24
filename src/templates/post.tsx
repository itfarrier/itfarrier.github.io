import type { PageProps } from 'gatsby';
import type { FC } from 'react';
import type { BlogPostTemplateQuery as BlogPostTemplateQueryType } from 'root/graphql-types';

import { Layout } from 'cmpts/Layout';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

const BlogPostTemplate: FC<PageProps<BlogPostTemplateQueryType>> = (props) => {
  const {
    data: {
      markdownRemark: {
        excerpt,
        frontmatter,
        frontmatter: { date, title },
        html,
      },
      site: { siteMetadata },
    },
    location,
    pageContext: { next, previous },
  } = props;

  return (
    <Layout location={location}>
      <Helmet meta={[{ content: excerpt, name: 'description' }]} title={`${siteMetadata.title} — ${title}`} />
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
                <Link rel={'prev'} to={previous.fields.slug}>
                  {`← ${previous.frontmatter.title}`}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link rel={'next'} to={next.fields.slug}>
                  {`${next.frontmatter.title} →`}
                </Link>
              </li>
            )}
          </ul>
        )}
      </article>
    </Layout>
  );
};

export const BlogPostTemplateQuery = graphql`
  query BlogPostTemplate($slug: String!) {
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
