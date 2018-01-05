/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectHomePage = () => createSelector(
  selectHome,
  (substate) => substate.toJS()
);

export {
  selectHome,
  makeSelectHomePage,
  makeSelectUsername,
};
