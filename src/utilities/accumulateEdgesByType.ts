import { FRONTMATTER_TYPES, LANGUAGE_CODES } from 'src/constants';

type MarkdownRemarkEdge = GatsbyTypes.MarkdownRemarkEdge;

export type ItemLanguage = Record<LANGUAGE_CODES, MarkdownRemarkEdge[]>;

export type AccumulatedEdgesByType = Record<FRONTMATTER_TYPES, ItemLanguage>;

export type AccumulateEdgesByType = (
  accumulator: AccumulatedEdgesByType,
  item: MarkdownRemarkEdge,
  itemLanguage: LANGUAGE_CODES,
  type: FRONTMATTER_TYPES,
) => AccumulatedEdgesByType;

export const accumulateEdgesByType: AccumulateEdgesByType = (
  accumulator,
  item,
  itemLanguage,
  type,
) => {
  return {
    ...accumulator,
    [type]: {
      ...accumulator[type],
      [itemLanguage]: [
        ...(accumulator[type][itemLanguage] !== undefined ? accumulator[type][itemLanguage] : []),
        item,
      ],
    },
  };
};
