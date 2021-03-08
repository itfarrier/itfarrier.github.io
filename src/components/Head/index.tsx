import React, { FC, useContext } from 'react';

import { Context } from 'cmpts/Context';
import { HeadView } from 'cmpts/Head/HeadView';
import { HeadProps } from 'cmpts/Head/types';
import { generateAndroidChromeHeadLinks } from 'src/utilities/generateAndroidChromeHeadLinks';
import { generateAppleTouchHeadLinks } from 'src/utilities/generateAppleTouchHeadLinks';
import { generateFaviconHeadLinks } from 'src/utilities/generateFaviconHeadLinks';

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

export const Head: FC<HeadProps> = (props) => {
  const {
    href,
    i18nMessages: { description, keywords, title },
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
