module.exports = {
  siteMetadata: {
    title: 'podabed.org',
  },
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/locales`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-plugin-i18next',
      options: {
        availableLngs: ['en', 'ru'],
        debug: true,
        fallbackLng: 'en',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
  ],
};
