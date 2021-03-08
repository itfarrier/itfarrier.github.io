import * as React from 'react';
import { useContext } from 'react';

import { generateAndroidChromeHeadLinks } from '../../utilities/generateAndroidChromeHeadLinks';
import { generateAppleTouchHeadLinks } from '../../utilities/generateAppleTouchHeadLinks';
import { generateFaviconHeadLinks } from '../../utilities/generateFaviconHeadLinks';
import Context from '../Context';
import { HeadView } from './HeadView';
import { HeadProps } from './types';

const androidChromeIcons = generateAndroidChromeHeadLinks([
  36,
  48,
  72,
  96,
  144,
  192,
  256,
  384,
  512,
]);

const appleTouchIcons = generateAppleTouchHeadLinks([57, 60, 72, 76, 114, 120, 144, 152, 180]);

const favicons = generateFaviconHeadLinks([16, 32]);

const Head: React.FC<HeadProps> = (props) => {
  const {
    i18nMessages: { description, keywords, title },
    href,
  } = props;

  const { language } = useContext(Context);

  return (
    <HeadView
      androidChromeIcons={androidChromeIcons}
      appleTouchIcons={appleTouchIcons}
      description={description}
      favicons={favicons}
      href={href}
      keywords={keywords}
      language={language}
      title={title}
    />
  );
};

export default Head;
