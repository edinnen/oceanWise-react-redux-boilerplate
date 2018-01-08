import { createSelector } from 'reselect';

/**
 * Direct selector to the post state domain
 */
const selectPostDomain = (state) => state.get('post');
const selectLanguage = (state) => state.get('language');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Post
 */

const makeSelectLocale = () => createSelector(
  selectLanguage,
  (substate) => substate.get('locale')
);

export default makeSelectLocale;
export {
  selectPostDomain,
  selectLanguage,
};
