import { navigate } from 'gatsby';
import * as React from 'react';

import { ILangObject } from '../../interfaces';

const SelectLanguage: React.FC = (props: any): React.ReactElement => {
  const { langsMenu, toggleLanguage } = props;

  const links: React.ReactElement[] = langsMenu.map(
    (lang: ILangObject): React.ReactElement => {
      const onClick: () => void = (): void => {
        toggleLanguage(lang.langKey);
        navigate(lang.link);
      };

      return (
        <button key={lang.langKey} onClick={onClick}>
          {lang.langKey}
        </button>
      );
    },
  );

  return <>{links}</>;
};

export default SelectLanguage;
