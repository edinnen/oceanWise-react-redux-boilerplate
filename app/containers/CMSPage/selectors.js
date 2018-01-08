import { createSelector } from 'reselect';

/**
 * Direct selector to the cmspage state domain
 */
const selectCMSPageDomain = (state) => state.get('cmspage');
const selectLanguage = (state) => state.get('language');

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

const makeSelectLocale = () => createSelector(
  selectLanguage,
  (substate) => substate.get('locale')
);

export default makeSelectCMSPage;
export {
  selectCMSPageDomain,
  makeSelectLocale,
};
