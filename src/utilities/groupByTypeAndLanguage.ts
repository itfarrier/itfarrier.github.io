import { FRONTMATTER_TYPES, LANGUAGE_CODES } from 'src/constants';

type MarkdownRemarkEdge = GatsbyTypes.MarkdownRemarkEdge;

export type ItemLanguage = Record<LANGUAGE_CODES, MarkdownRemarkEdge[] | unknown>;

export type AccumulatedEdgesByType = Record<FRONTMATTER_TYPES, ItemLanguage>;

export type AccumulateEdgesByType = (
  accumulator: AccumulatedEdgesByType,
  item: MarkdownRemarkEdge,
  itemLanguage: LANGUAGE_CODES,
  type: FRONTMATTER_TYPES,
) => AccumulatedEdgesByType;

export const groupByTypeAndLanguage = (accumulator, item: MarkdownRemarkEdge) => {
  const { fields, frontmatter } = item.node;

  const { langKey } = fields;

  const { type } = frontmatter;

  return {
    ...accumulator,
    ...(type
      ? {
          [type]: {
            ...(accumulator[type] ? accumulator[type] : {}),
            ...(langKey
              ? {
                  [langKey]: [
                    ...(accumulator[type] && accumulator[type][langKey]
                      ? accumulator[type][langKey]
                      : []),
                    item,
                  ],
                }
              : {}),
          },
        }
      : {}),
  };
};
