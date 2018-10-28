export interface IData {
  site: { siteMetadata: { title: string } };
}

export interface ILayout {
  children: object;
  data: IData;
}

export interface IHeader {
  siteTitle: string;
}
