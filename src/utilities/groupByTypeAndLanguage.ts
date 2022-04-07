import { EMPTY_ARRAY, EMPTY_OBJECT } from '../constants/fallbacks';

export const groupByTypeAndLanguage = (accumulator, item) => {
  const { fields, frontmatter } = item.node;

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
                    ...(accumulator[type] && accumulator[type][langKey]
                      ? accumulator[type][langKey]
                      : EMPTY_ARRAY),
                    item,
                  ],
                }
              : EMPTY_OBJECT),
          },
        }
      : EMPTY_OBJECT),
  };
};
