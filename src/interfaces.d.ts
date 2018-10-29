export interface IData {
  allMarkdownRemark: {
    edges: object[];
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
