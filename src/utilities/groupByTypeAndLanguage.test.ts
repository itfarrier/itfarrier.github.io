import { EMPTY_OBJECT, MARKDOWN_EDGE_FALLBACK } from 'src/constants/fallbacks';
import { Edge } from 'src/types';
import { groupByTypeAndLanguage } from 'src/utilities/groupByTypeAndLanguage';

describe('groupByTypeAndLanguage', () => {
  it('returns initial structure for fallback edge object', () => {
    expect(groupByTypeAndLanguage(EMPTY_OBJECT, MARKDOWN_EDGE_FALLBACK)).toEqual(EMPTY_OBJECT);
  });

  const edgeWithEXAMPLE_LANG_KEYLangKey: Edge = {
    ...MARKDOWN_EDGE_FALLBACK,
    node: {
      ...MARKDOWN_EDGE_FALLBACK.node,
      fields: { ...MARKDOWN_EDGE_FALLBACK.node.fields, langKey: 'EXAMPLE_LANG_KEY' },
    },
  };

  it('returns initial structure for edge object with langKey only', () => {
    expect(groupByTypeAndLanguage(EMPTY_OBJECT, edgeWithEXAMPLE_LANG_KEYLangKey)).toEqual(
      EMPTY_OBJECT,
    );
  });

  const edgeWithEXAMPLE_TYPEType: Edge = {
    ...MARKDOWN_EDGE_FALLBACK,
    node: {
      ...MARKDOWN_EDGE_FALLBACK.node,
      frontmatter: {
        ...MARKDOWN_EDGE_FALLBACK.node.frontmatter,
        type: 'EXAMPLE_TYPE',
      },
    },
  };

  it('returns object with EXAMPLE_TYPE key with empty object as the value for edge object with type only', () => {
    expect(groupByTypeAndLanguage(EMPTY_OBJECT, edgeWithEXAMPLE_TYPEType)).toEqual({
      EXAMPLE_TYPE: {},
    });
  });

  const edgeWithEXAMPLE_LANG_KEYLangKeyAndEXAMPLE_TYPEType: Edge = {
    ...MARKDOWN_EDGE_FALLBACK,
    node: {
      ...MARKDOWN_EDGE_FALLBACK.node,
      fields: { ...MARKDOWN_EDGE_FALLBACK.node.fields, langKey: 'EXAMPLE_LANG_KEY' },
      frontmatter: {
        ...MARKDOWN_EDGE_FALLBACK.node.frontmatter,
        type: 'EXAMPLE_TYPE',
      },
    },
  };

  it('returns object with nested EXAMPLE_TYPE key with nested EXAMPLE_LANG_KEY key as the value for edge object with langKey and type', () => {
    expect(
      groupByTypeAndLanguage(EMPTY_OBJECT, edgeWithEXAMPLE_LANG_KEYLangKeyAndEXAMPLE_TYPEType),
    ).toEqual({
      EXAMPLE_TYPE: { EXAMPLE_LANG_KEY: [edgeWithEXAMPLE_LANG_KEYLangKeyAndEXAMPLE_TYPEType] },
    });
  });
});
