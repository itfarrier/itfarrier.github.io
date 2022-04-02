import { resolve } from 'path';

import { GatsbyNode } from 'gatsby';

import { accumulateEdgesByType } from './src/utilities/accumulateEdgesByType';

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = (gatsbyNodeHelpers) => {
  gatsbyNodeHelpers.actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: { runtime: 'automatic' },
  });
};

export const createPages: GatsbyNode['createPages'] = (gatsbyNodeHelpers) => {
  const {
    actions: { createPage },
    graphql,
  } = gatsbyNodeHelpers;

  const blogPostTemplate = resolve('src/templates/post.tsx');

  const pageTemplate = resolve('src/templates/page.tsx');

  return graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                langKey
                slug
              }
              frontmatter {
                language
                title
                type
              }
            }
          }
        }
      }
    `,
  )
    .then((result) => {
      if (result.errors) {
        throw result.errors;
      }

      const groupedByLanguage = result.data.allMarkdownRemark.edges.reduce(
        (acc, item) => {
          const { fields, frontmatter } = item.node;
          const itemLanguage = fields.langKey;

          return frontmatter.type === 'page'
            ? accumulateEdgesByType(acc, item, itemLanguage, 'pages')
            : accumulateEdgesByType(acc, item, itemLanguage, 'posts');
        },
        { pages: {}, posts: {} },
      );

      Object.keys(groupedByLanguage.pages).forEach((key) => {
        groupedByLanguage.pages[key].forEach((item) => {
          const { langKey, slug } = item.node.fields;

          createPage({
            component: pageTemplate,
            context: { langKey, language: langKey, slug },
            path: slug,
          });
        });
      });

      Object.keys(groupedByLanguage.posts).forEach((key) => {
        groupedByLanguage.posts[key].forEach((item, index) => {
          const { langKey, slug } = item.node.fields;

          const next = index === 0 ? null : groupedByLanguage.posts[key][index - 1].node;
          const previous =
            index === groupedByLanguage.posts[key].length - 1
              ? null
              : groupedByLanguage.posts[key][index + 1].node;

          createPage({
            component: blogPostTemplate,
            context: { langKey, language: langKey, next, previous, slug },
            path: slug,
          });
        });
      });
    })
    .catch((error) => {
      throw error;
    });
};
