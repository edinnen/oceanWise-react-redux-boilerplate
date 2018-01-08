import { createSelector } from 'reselect';

/**
 * Direct selector to the cosmicTest state domain
 */
const selectCosmicTestDomain = (state) => state.get('cosmicTest');
const selectLanguageDomain = (state) => state.get('language');

/**
 * Other specific selectors
 */

/**
 * Default selector used by CosmicTest
 */

const makeSelectCosmicTest = () => createSelector(
  selectCosmicTestDomain,
  (substate) => substate.toJS()
);

// Add the currently selected locale to the props
const makeSelectLocale = () => createSelector(
  selectLanguageDomain,
  (substate) => substate.get('locale')
);

export default makeSelectCosmicTest;
export {
  selectCosmicTestDomain,
  makeSelectLocale,
};
