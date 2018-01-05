import { createSelector } from 'reselect';

/**
 * Direct selector to the cmspage state domain
 */
const selectCMSPageDomain = (state) => state.get('cmspage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Cmspage
 */

const makeSelectCMSPage = () => createSelector(
  selectCMSPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectCMSPage;
export {
  selectCMSPageDomain,
};
