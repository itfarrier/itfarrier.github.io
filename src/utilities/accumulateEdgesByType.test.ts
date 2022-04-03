import { FRONTMATTER_TYPES, LANGUAGE_CODES } from 'src/constants';
import { accumulateEdgesByType } from 'src/utilities/accumulateEdgesByType';

describe('accumulateEdgesByType', () => {
  it('returns initial structure with empty array', () => {
    expect(
      accumulateEdgesByType(
        {
          [FRONTMATTER_TYPES.PAGE]: {},
          [FRONTMATTER_TYPES.POST]: {},
        },
        {},
        LANGUAGE_CODES.EN,
        FRONTMATTER_TYPES.PAGE,
      ),
    ).toEqual({
      [FRONTMATTER_TYPES.PAGE]: { [LANGUAGE_CODES.EN]: [{}] },
      [FRONTMATTER_TYPES.POST]: {},
    });
  });
});
