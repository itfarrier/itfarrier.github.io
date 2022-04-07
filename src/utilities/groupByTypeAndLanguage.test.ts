import { LANGUAGE_CODES } from 'src/constants';
import { groupByTypeAndLanguage } from 'src/utilities/groupByTypeAndLanguage';

type MarkdownRemarkEdge = GatsbyTypes.MarkdownRemarkEdge;

describe('groupByTypeAndLanguage', () => {
  it('returns initial structure with example object inside the right lang key', () => {
    expect(
      groupByTypeAndLanguage(
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
      groupByTypeAndLanguage(
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
