const languages = require('./src/languages/languages');

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
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
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        langKeyDefault: languages.defaultLangKey,
        langKeyForNull: 'en',
        prefixDefault: true,
        useLangKeyLayout: false,
      },
      resolve: 'gatsby-plugin-i18n',
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
      options: {
        background_color: '#fff',
        display: 'minimal-ui',
        name: 'podabed.org',
        short_name: 'podabed',
        start_url: '/',
        theme_color: '#fff',
        // icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
      resolve: 'gatsby-plugin-manifest',
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
  ],
  siteMetadata: {
    languages,
    title: 'podabed.org',
  },
};
