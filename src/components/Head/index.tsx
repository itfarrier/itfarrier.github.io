import type { FC } from 'react';
import type { HeadQuery } from 'root/graphql-types';

import { useLocation } from '@reach/router';
import { HeadView } from 'cmpts/Head/HeadView';
import { LanguageContext } from 'cmpts/LanguageContext';
import { graphql, useStaticQuery } from 'gatsby';
import { useContext } from 'react';
import { siteMetadata } from 'src/data/siteMetadata';
import { generateAndroidChromeHeadLinks } from 'src/utilities/generateAndroidChromeHeadLinks';
import { generateAppleTouchHeadLinks } from 'src/utilities/generateAppleTouchHeadLinks';
import { generateFaviconHeadLinks } from 'src/utilities/generateFaviconHeadLinks';

const androidChromeIcons = generateAndroidChromeHeadLinks([36, 48, 72, 96, 144, 192, 256, 384, 512]);

const appleTouchIcons = generateAppleTouchHeadLinks([57, 60, 72, 76, 114, 120, 144, 152, 180]);

const favicons = generateFaviconHeadLinks([16, 32]);

export const Head: FC = () => {
  const { language } = useContext(LanguageContext);

  const { href } = useLocation();

  const data = useStaticQuery<HeadQuery>(graphql`
    query Head {
      site {
        siteMetadata {
          description
          keywords
          title
        }
      }
    }
  `);

  const { description, keywords = [], title } = data.site?.siteMetadata ?? siteMetadata;

  return (
    <HeadView
      androidChromeIcons={androidChromeIcons}
      appleTouchIcons={appleTouchIcons}
      description={description}
      favicons={favicons}
      href={href}
      keywords={keywords.toString()}
      language={language}
      title={title}
    />
  );
};
