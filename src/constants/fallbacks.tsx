import { FRONTMATTER_TYPES } from 'src/constants/index';
import { AccumulatedEdgesByType } from 'src/utilities/accumulateEdgesByType';

export const EMPTY_ARRAY = [];
export const EMPTY_COMPONENT = () => <></>;
export const EMPTY_FUNCTION = () => {};
export const EMPTY_OBJECT = {};
export const EMPTY_STRING = '';

export const GROUPED_BY_TYPE_AND_LANGUAGE_FALLBACK: AccumulatedEdgesByType = {
  [FRONTMATTER_TYPES.PAGE]: EMPTY_OBJECT,
  [FRONTMATTER_TYPES.POST]: EMPTY_OBJECT,
};
