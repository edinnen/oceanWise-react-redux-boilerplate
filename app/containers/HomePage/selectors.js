/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');
const selectLanguage = (state) => state.get('language');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectHomePage = () => createSelector(
  selectHome,
  (substate) => substate.toJS()
);

const makeSelectLocale = () => createSelector(
  selectLanguage,
  (substate) => substate.get('locale')
);

export {
  selectHome,
  makeSelectHomePage,
  makeSelectUsername,
  makeSelectLocale,
};
