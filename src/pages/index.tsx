import { graphql } from 'gatsby';
import { Link, withI18next } from 'gatsby-plugin-i18next';
import * as React from 'react';
import { I18n } from 'react-i18next';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const Index: React.SFC<IPage> = () => (
  <I18n>
    {(t) => (
      <Layout>
        <h1>{t('Hi people')}</h1>
      </Layout>
    )}
  </I18n>
);

export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng }, ns: { eq: "messages" } }) {
      ...TranslationFragment
    }
  }
`;

export default withI18next()(Index);
