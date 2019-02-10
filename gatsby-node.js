const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const { langs } = require('./src/languages/languages');

exports.onCreateNode = ({
  node,
  node: {
    internal: { type },
  },
  actions: { createNodeField },
  getNode,
}) => {
  if (type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/post.tsx');

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    langKey
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
            site {
              siteMetadata {
                languages {
                  defaultLangKey
                  langs
                }
              }
            }
          }
        `,
      ).then(({ data: { allMarkdownRemark: { edges } }, errors }) => {
        if (errors) {
          console.log(errors);

          reject(errors);
        }

        return edges.forEach(({ node: { fields: { slug } } }, index) => {
          const previous = index === edges.length - 1 ? 'null' : edges[index + 1].node;
          const next = index === 0 ? 'null' : edges[index - 1].node;

          return langs.forEach((lang) => {
            console.log('path', `${lang}${slug}`);

            return createPage({
              component: blogPostTemplate,
              context: {
                next: `${lang}${next.slug}`,
                previous: `${lang}${previous.slug}`,
                slug: `${lang}${slug}`,
              },
              path: `${lang}${slug}`,
            });
          });
        });
      }),
    );
  });
};
