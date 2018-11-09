import { Language } from 'gatsby-plugin-i18next';
import * as React from 'react';

const Switcher = ({ changeLng, lng, availableLngs }) => (
  <ul>
    {availableLngs.map((value) => {
      const onClick = () => changeLng(value);

      return (
        <li key={value}>
          <button onClick={onClick}>{value}</button>
        </li>
      );
    })}
  </ul>
);

export default (props) => (
  <Language>{(lngProps) => <Switcher {...props} {...lngProps} />}</Language>
);
