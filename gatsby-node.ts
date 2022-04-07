import { resolve } from 'path';

import { GatsbyNode } from 'gatsby';

import { EMPTY_OBJECT } from './src/constants/fallbacks';
import { groupByTypeAndLanguage } from './src/utilities/groupByTypeAndLanguage';

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

      const groupedByTypeAndLanguage = result.data.allMarkdownRemark.edges.reduce(
        groupByTypeAndLanguage,
        EMPTY_OBJECT,
      );

      Object.keys(groupedByTypeAndLanguage.page).forEach((key) => {
        groupedByTypeAndLanguage.page[key].forEach((item) => {
          const { langKey, slug } = item.node.fields;

          createPage({
            component: pageTemplate,
            context: { langKey, language: langKey, slug },
            path: slug,
          });
        });
      });

      Object.keys(groupedByTypeAndLanguage.post).forEach((key) => {
        groupedByTypeAndLanguage.post[key].forEach((item, index) => {
          const { langKey, slug } = item.node.fields;

          const next = index === 0 ? null : groupedByTypeAndLanguage.post[key][index - 1].node;
          const previous =
            index === groupedByTypeAndLanguage.post[key].length - 1
              ? null
              : groupedByTypeAndLanguage.post[key][index + 1].node;

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
