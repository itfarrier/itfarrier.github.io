import { navigate } from 'gatsby';
import * as React from 'react';

import { ILangObject } from '../../interfaces';
import * as styles from './SelectLanguage.module.css';

const SelectLanguage: React.FC = (props: any): React.ReactElement => {
  const { langsMenu, toggleLanguage } = props;

  const links: React.ReactElement[] = langsMenu.map(
    (lang: ILangObject): React.ReactElement => {
      const onClick: () => void = (): void => {
        toggleLanguage(lang.langKey);
        navigate(lang.link);
      };
      const styleLineThroughForUnselectedLanguage =
        lang.selected === false ? styles.selectedLanguage : null;

      return (
        <button className={styles.languageChangeButton} key={lang.langKey} onClick={onClick}>
          <span className={styleLineThroughForUnselectedLanguage}>{lang.langKey}</span>
        </button>
      );
    },
  );

  return <>{links}</>;
};

export default SelectLanguage;
