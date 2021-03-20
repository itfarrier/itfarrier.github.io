import { FC } from 'react';

import { Head } from 'cmpts/Head';
import { Header } from 'cmpts/Header';
import { LanguageContextProvider } from 'cmpts/LanguageContext';

export const Layout: FC = (props) => {
  return (
    <LanguageContextProvider>
      <Head />
      <Header />
      <main>{props.children}</main>
    </LanguageContextProvider>
  );
};
