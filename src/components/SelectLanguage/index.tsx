import { navigate } from 'gatsby';
import * as React from 'react';

import { ILangObject } from '../../interfaces';

const SelectLanguage: React.FC = (props) => {
  const { langsMenu, toggleLanguage } = props;

  const links = langsMenu.map((lang: ILangObject) => {
    const onClick = () => {
      toggleLanguage(lang.langKey);
      navigate(lang.link);
    };

    return (
      <button key={lang.langKey} onClick={onClick}>
        {lang.langKey}
      </button>
    );
  });

  return <>{links}</>;
};

export default SelectLanguage;
