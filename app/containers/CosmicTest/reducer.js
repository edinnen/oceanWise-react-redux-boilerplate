/*
 *
 * CosmicTest reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LIST_LOADED,
  POST_LOADED,
} from './constants';

// Initialize the state
const initialState = fromJS({
  loaded: false,
  postList: [],
  fetchedContent: [],
});

function cosmicTestReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LOADED: {
      // Create a new state
      const newState = fromJS({
        loaded: true, // Set loaded to true
        postList: action.listData, // Put the fetched posts into postList
        fetchedContent: state.fetchedContent, // Leave fetchedContent unchanged
      });
      return newState; // Return the new state
    }
    case POST_LOADED:
      return state;
        // .set('fetchedContent', [...state.fetchedContent, action.postData]);
      // return {
      //   fetchedContent: [...state.postList, action.postData],
      // };
    default:
      return state;
  }
}

export default cosmicTestReducer;
