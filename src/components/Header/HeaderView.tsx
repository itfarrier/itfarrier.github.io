import type { HeaderViewProps } from 'cmpts/Header/types';
import type { FC } from 'react';

import { HeaderLink } from 'cmpts/HeaderLink';
import { SelectLanguage } from 'cmpts/SelectLanguage';

export const HeaderView: FC<HeaderViewProps> = (props) => {
  const { links } = props;

  return (
    <header>
      <nav>
        <SelectLanguage />
      </nav>
      <nav role={'navigation'}>
        <ul>
          {links.map((link) => {
            const { text, to } = link;

            return <HeaderLink key={text} text={text} to={to} />;
          })}
        </ul>
      </nav>
    </header>
  );
};
