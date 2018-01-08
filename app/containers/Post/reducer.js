/*
 *
 * Post reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  POST_LOADED,
} from './constants';

const initialState = fromJS({
  postData: {},
});

function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOADED:
      return state
        .set('postData', action.data);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default postReducer;
