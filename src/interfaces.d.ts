import { ChangeEvent } from 'react';

export interface IData {
  allFile: { edges: Array<{ node: { childImageSharp: IChildImageSharp; id: string } }> };
  allMarkdownRemark: {
    edges: Array<{
      node: IMarkdownRemark;
    }>;
  };
  markdownRemark: IMarkdownRemark;
  site: { siteMetadata: { title: string } };
}

export interface IPage {
  children: object;
  data: IData;
  pageContext?: {
    next: INextPrevious;
    previous: INextPrevious;
  };
}

export interface INextPrevious {
  fields: {
    slug: string;
  };
  frontmatter: IFrontmatter;
}
export interface IHeader {
  data: IData;
  themeIsDark: boolean;
  toggleTheme: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IMarkdownRemark {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: IFrontmatter;
  html: string;
}

export interface IChildImageSharp {
  fluid: object;
  id: string;
}
export interface IFrontmatter {
  date: string;
  title: string;
}

export interface ILayout {
  data: IData;
}
interface ICSSModule {
  [className: string]: string;
}

declare module '*.module.css' {
  const cssModule: ICSSModule;
  export = cssModule;
}
