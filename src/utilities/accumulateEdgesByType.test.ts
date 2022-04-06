import { FRONTMATTER_TYPES, LANGUAGE_CODES } from 'src/constants';
import { GROUPED_BY_TYPE_AND_LANGUAGE_FALLBACK } from 'src/constants/fallbacks';
import { accumulateEdgesByType } from 'src/utilities/accumulateEdgesByType';

type MarkdownRemarkEdge = GatsbyTypes.MarkdownRemarkEdge;

describe('accumulateEdgesByType', () => {
  it('returns initial structure with example object inside the right lang key', () => {
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

    expect(
      accumulateEdgesByType(
        GROUPED_BY_TYPE_AND_LANGUAGE_FALLBACK,
        { isExample: true } as unknown as MarkdownRemarkEdge,
        LANGUAGE_CODES.RU,
        FRONTMATTER_TYPES.PAGE,
      ),
    ).toEqual({
      [FRONTMATTER_TYPES.PAGE]: { [LANGUAGE_CODES.RU]: [{ isExample: true }] },
      [FRONTMATTER_TYPES.POST]: {},
    });
  });
});
