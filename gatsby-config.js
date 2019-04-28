const siteMetadata = require('./src/data/siteMetadata');

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-axe',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'blog',
        path: `${__dirname}/src/pages/blog`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        plugins: [
          {
            options: {
              maxWidth: 7680,
              showCaptions: true,
              withWebp: true,
            },
            resolve: 'gatsby-remark-images',
          },
        ],
      },
      resolve: 'gatsby-transformer-remark',
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'podabed.org',
        short_name: 'podabed',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        // icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    {
      options: {
        langKeyDefault: siteMetadata.languages.defaultLangKey,
        langKeyForNull: siteMetadata.languages.defaultLangKey,
        prefixDefault: true,
        useLangKeyLayout: false,
      },
      resolve: 'gatsby-plugin-i18n',
    },
  ],
};
