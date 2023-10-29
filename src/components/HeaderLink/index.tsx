import type { HeaderLinkProps } from 'cmpts/HeaderLink/types';
import type { FC } from 'react';

import { Link } from 'gatsby';

export const HeaderLink: FC<HeaderLinkProps> = (props) => {
  const { text, to } = props;

  return (
    <li>
      <Link role={'link'} to={to}>
        {text}
      </Link>
    </li>
  );
};
