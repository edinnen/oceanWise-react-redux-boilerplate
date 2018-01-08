/*
 *
 * Cmspage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  PAGE_LOADED,
} from './constants';

const initialState = fromJS({});

function cmspageReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_LOADED:
      return state
        .set('pageData', action.data);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cmspageReducer;
