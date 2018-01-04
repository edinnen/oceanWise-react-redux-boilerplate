import { createSelector } from 'reselect';

/**
 * Direct selector to the post state domain
 */
const selectPostDomain = (state) => state.get('post');
const selectParentDomain = (state) => state.get('cosmicTest'); // Select the domain of the parent container; in this case 'cosmicTest'

/**
 * Other specific selectors
 */


/**
 * Default selector used by Post
 */

const makeSelectPost = () => createSelector(
  selectParentDomain, // Select the parent container to carry forward its state
  (substate) => substate.toJS()
);

export default makeSelectPost;
export {
  selectPostDomain,
  selectParentDomain,
};
