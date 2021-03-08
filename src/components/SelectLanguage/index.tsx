import * as React from 'react';
import { useContext } from 'react';

import { navigate } from 'gatsby';

import { ILangObject } from '../../interfaces';
import Context from '../Context';
import { SelectLanguageProps } from './types';

const SelectLanguage: React.FC<SelectLanguageProps> = (props) => {
  const { langsMenu } = props;

  const { toggleLanguage } = useContext(Context);

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
