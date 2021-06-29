import { FC } from 'react';

import { Link } from 'gatsby';

import { HeaderLinkProps } from 'cmpts/HeaderLink/types';

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
