export interface IData {
  allFile: { edges: Array<{ node: { childImageSharp: IChildImageSharp } }> };
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
  siteTitle: string;
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
}
export interface IFrontmatter {
  date: string;
  title: string;
}
