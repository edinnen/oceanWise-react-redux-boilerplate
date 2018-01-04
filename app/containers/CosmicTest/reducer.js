/*
 *
 * CosmicTest reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';

import {
  LIST_LOADED,
  POST_LOADED,
} from './constants';

// Initialize the state
const initialState = fromJS({
  loaded: false,
  timestamp: moment().unix(),
  postList: [],
  postData: {},
});

function cosmicTestReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LOADED: {
      // Set the timestamp to the time when this reducer was called, update the postList with the most recently pulled post previews
      return state
        .set('loaded', true)
        .set('timestamp', moment().unix())
        .set('postList', action.listData);
    }
    case POST_LOADED: {
      // Update the state with the full post data
      return state
        .set('postData', action.data);
    }
    default:
      return state;
  }
}

export default cosmicTestReducer;
