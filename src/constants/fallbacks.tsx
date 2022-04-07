import { Edge } from 'src/types';

export const EMPTY_ARRAY = [];
export const EMPTY_COMPONENT = () => <></>;
export const EMPTY_FUNCTION = () => {};
export const EMPTY_OBJECT = {};
export const EMPTY_STRING = '';

export const MARKDOWN_EDGE_FALLBACK: Edge = {
  node: {
    fields: { langKey: EMPTY_STRING, slug: EMPTY_STRING },
    frontmatter: { language: EMPTY_STRING, title: EMPTY_STRING, type: EMPTY_STRING },
  },
};
