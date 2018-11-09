import { graphql } from 'gatsby';
import { withI18next } from 'gatsby-plugin-i18next';
import * as React from 'react';
import { I18n } from 'react-i18next';

import Layout from '../components/Layout';

const About: React.SFC = () => (
  <I18n>
    {(t) => (
      <Layout>
        <article>
          <header>
            <h1>{t('Another unnecessary shit-blog')}</h1>
          </header>
        </article>
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
export default withI18next()(About);
