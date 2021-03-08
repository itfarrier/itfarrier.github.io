import React, { FC, useContext } from 'react';

import { navigate } from 'gatsby';

import { Context } from 'cmpts/Context';
import { SelectLanguageProps } from 'cmpts/SelectLanguage/types';
import { ILangObject } from 'src/interfaces';

export const SelectLanguage: FC<SelectLanguageProps> = (props) => {
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
