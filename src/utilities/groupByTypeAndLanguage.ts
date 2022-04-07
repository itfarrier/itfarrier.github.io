import { Edge, GroupedByTypeAndLanguage } from 'src/types';

import { EMPTY_ARRAY, EMPTY_OBJECT } from '../constants/fallbacks';

export type GroupByTypeAndLanguage = (
  accumulator: GroupedByTypeAndLanguage,
  edge: Edge,
) => GroupedByTypeAndLanguage;

export const groupByTypeAndLanguage: GroupByTypeAndLanguage = (accumulator, edge) => {
  const { fields, frontmatter } = edge.node;

  const { langKey } = fields;

  const { type } = frontmatter;

  return {
    ...accumulator,
    ...(type
      ? {
          [type]: {
            ...(accumulator[type] ? accumulator[type] : EMPTY_OBJECT),
            ...(langKey
              ? {
                  [langKey]: [
                    ...(accumulator[type] && accumulator[type]?.[langKey]
                      ? accumulator[type]?.[langKey] ?? EMPTY_ARRAY
                      : EMPTY_ARRAY),
                    edge,
                  ],
                }
              : EMPTY_OBJECT),
          },
        }
      : EMPTY_OBJECT),
  };
};
