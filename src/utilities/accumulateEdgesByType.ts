export const accumulateEdgesByType = (accumulator, item, itemLanguage, type) => {
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
