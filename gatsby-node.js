const path = require('path');

const _ = require('lodash');

exports.createPages = ({ actions: { createPage }, graphql }) => {
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
                    langKey
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
      ).then(
        ({
          data: {
            allMarkdownRemark: { edges },
          },
          errors,
        }) => {
          if (errors) {
            console.log(errors);

            return reject(errors);
          }

          const splitted = _.groupBy(edges, { node: { fields: { langKey: 'en' } } });

          splitted.false.forEach(
            (
              {
                node: {
                  fields: { langKey, slug },
                },
              },
              index,
            ) => {
              const previous =
                index === splitted.false.length - 1 ? null : splitted.false[index + 1].node;
              const next = index === 0 ? null : splitted.false[index - 1].node;

              createPage({
                component: blogPostTemplate,
                context: {
                  langKey,
                  next,
                  previous,
                  slug,
                },
                path: slug,
              });
            },
          );
          splitted.true.forEach(
            (
              {
                node: {
                  fields: { langKey, slug },
                },
              },
              index,
            ) => {
              const previous =
                index === splitted.true.length - 1 ? null : splitted.true[index + 1].node;
              const next = index === 0 ? null : splitted.true[index - 1].node;

              createPage({
                component: blogPostTemplate,
                context: {
                  langKey,
                  next,
                  previous,
                  slug,
                },
                path: slug,
              });
            },
          );
        },
      ),
    );
  });
};
