export interface IData {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        excerpt: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          date: string;
          title: string;
        };
      };
    }>;
  };
  site: { siteMetadata: { title: string } };
}

export interface IPage {
  children: object;
  data: IData;
}

export interface IHeader {
  siteTitle: string;
}
