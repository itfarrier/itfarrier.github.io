import { Link } from 'gatsby';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = (props) => {
  const links = props.langsMenu.map((lang) => (
    <li selected={lang.selected}>
      <Link to={lang.link} onClick={() => props.toggleLanguage(props.locale)} key={lang.langKey}>
        {lang.langKey}
      </Link>
    </li>
  ));

  return (
    <section>
      <header>
        <FormattedMessage id='selectLanguage' />
      </header>
      <ul>{links}</ul>
    </section>
  );
};

export default SelectLanguage;
