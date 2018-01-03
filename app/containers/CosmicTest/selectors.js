import { createSelector } from 'reselect';

/**
 * Direct selector to the cosmicTest state domain
 */
const selectCosmicTestDomain = (state) => state.get('cosmicTest');

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

export default makeSelectCosmicTest;
export {
  selectCosmicTestDomain,
};
