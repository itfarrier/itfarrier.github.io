import { FRONTMATTER_TYPES, LANGUAGE_CODES } from 'src/constants';
import { GROUPED_BY_TYPE_AND_LANGUAGE_FALLBACK } from 'src/constants/fallbacks';
import { accumulateEdgesByType } from 'src/utilities/accumulateEdgesByType';

type MarkdownRemarkEdge = GatsbyTypes.MarkdownRemarkEdge;

describe('accumulateEdgesByType', () => {
  it('returns initial structure with empty array', () => {
    expect(
      accumulateEdgesByType(
        GROUPED_BY_TYPE_AND_LANGUAGE_FALLBACK,
        { isExample: true } as unknown as MarkdownRemarkEdge,
        LANGUAGE_CODES.EN,
        FRONTMATTER_TYPES.PAGE,
      ),
    ).toEqual({
      [FRONTMATTER_TYPES.PAGE]: { [LANGUAGE_CODES.EN]: [{ isExample: true }] },
      [FRONTMATTER_TYPES.POST]: {},
    });
  });
});
