import { EMPTY_OBJECT } from 'src/constants/fallbacks';
import { groupByTypeAndLanguage } from 'src/utilities/groupByTypeAndLanguage';

describe('groupByTypeAndLanguage', () => {
  it('returns initial structure with example object inside the right lang key', () => {
    expect(groupByTypeAndLanguage(EMPTY_OBJECT, { isExample: true })).toEqual(EMPTY_OBJECT);
  });
});
