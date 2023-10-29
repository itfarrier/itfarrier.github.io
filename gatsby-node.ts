import type { GatsbyNode } from 'gatsby';
import type { AllMarkdownContentQuery } from 'root/graphql-types';
import type { Edge, GroupedByTypeAndLanguage } from 'src/types';

import { resolve } from 'path';

import { EDGE_TYPES } from './src/constants';
import { EMPTY_OBJECT } from './src/constants/fallbacks';
import { groupByTypeAndLanguage } from './src/utilities/groupByTypeAndLanguage';

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = (gatsbyNodeHelpers) => {
  gatsbyNodeHelpers.actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: { runtime: 'automatic' },
  });
};

export const createPages: GatsbyNode['createPages'] = (args) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    actions: { createPage },
    graphql,
  } = args;

  const blogPostTemplate = resolve('src/templates/post.tsx');

  const pageTemplate = resolve('src/templates/page.tsx');

  return graphql<AllMarkdownContentQuery>(`
    query AllMarkdownContent {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
  `)
    .then((result) => {
      if (result.errors) {
        throw result.errors;
      }

      const groupedByTypeAndLanguage =
        result.data?.allMarkdownRemark.edges.reduce<GroupedByTypeAndLanguage>(groupByTypeAndLanguage, EMPTY_OBJECT) ??
        EMPTY_OBJECT;

      Object.keys(groupedByTypeAndLanguage[EDGE_TYPES.PAGE] ?? EMPTY_OBJECT).forEach(
        (langKey: Edge['node']['fields']['langKey']) => {
          groupedByTypeAndLanguage?.[EDGE_TYPES.PAGE]?.[langKey]?.forEach((edge) => {
            const { langKey, slug } = edge.node.fields;

            createPage({
              component: pageTemplate,
              context: { langKey, language: langKey, slug },
              path: slug,
            });
          });
        },
      );

      Object.keys(groupedByTypeAndLanguage[EDGE_TYPES.POST] ?? EMPTY_OBJECT).forEach(
        (langKey: Edge['node']['fields']['langKey']) => {
          groupedByTypeAndLanguage?.[EDGE_TYPES.POST]?.[langKey]?.forEach((edge, index) => {
            const { langKey, slug } = edge.node.fields;

            const next = index === 0 ? null : groupedByTypeAndLanguage?.[EDGE_TYPES.POST]?.[langKey]?.[index - 1]?.node;
            const previous =
              index === groupedByTypeAndLanguage?.[EDGE_TYPES.POST]?.[langKey]?.length ?? 0 - 1
                ? null
                : groupedByTypeAndLanguage?.[EDGE_TYPES.POST]?.[langKey]?.[index + 1]?.node;

            createPage({
              component: blogPostTemplate,
              context: { langKey, language: langKey, next, previous, slug },
              path: slug,
            });
          });
        },
      );
    })
    .catch((error) => {
      throw error;
    });
};
