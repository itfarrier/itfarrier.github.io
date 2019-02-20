const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

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

    return createNodeField({
      name: 'slug',
      node,
      value,
    });
  }

  return false;
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/post.tsx');

    return resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `,
      ).then(({ data: { allMarkdownRemark: { edges } }, errors }) => {
        if (errors) {
          console.log(errors);

          return reject(errors);
        }

        return edges.forEach(({ node: { fields: { slug } } }, index) => {
          const previous = index === edges.length - 1 ? null : edges[index + 1].node;
          const next = index === 0 ? null : edges[index - 1].node;

          return createPage({
            component: blogPostTemplate,
            context: {
              next,
              previous,
              slug,
            },
            path: slug,
          });
        });
      }),
    );
  });
};
