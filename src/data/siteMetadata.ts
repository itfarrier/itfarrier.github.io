import { GatsbyConfig } from 'gatsby';

import { i18n } from './i18n';

export const siteMetadata: Required<GatsbyConfig>['siteMetadata'] = {
  description: 'About something',
  i18n,
  keywords: ['IT Farrier', 'IT', 'farrier', 'itfarrier'],
  name: 'itfarrier.com',
  shortName: 'itfarrier',
  siteUrl: 'https://itfarrier.com',
  title: '🇺🇦 #nowar #noputin #nolukashenko #нетвойне #нетпутину #нетлукашенко ITFarrier',
};
