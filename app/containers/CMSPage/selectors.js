import { createSelector } from 'reselect';

/**
 * Direct selector to the cmspage state domain
 */
const selectCMSPageDomain = (state) => state.get('cmspage');
const selectLanguage = (state) => state.get('language');
const selectRouteDomain = (state) => state.get('route');

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

// We need to select the current location so that we can selectively render the nav links based on our current URL path
// This is needed because if a user does not first go to the landing page and instead go to a page URL, say '/about', there will not
// be the necessary pageList data from the homepage reducer as it has not been loaded yet! With this we just test our location and, if needed,
// pull the data from the server
const makeSelectLocation = () => createSelector(
  selectRouteDomain,
  (substate) => substate.get('location').get('pathname')
);

export default makeSelectCMSPage;
export {
  selectCMSPageDomain,
  makeSelectLocale,
  makeSelectLocation,
};
