/*
 *
 * CosmicTest reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';

// Import the CHANGE_LOCALE constant to access the dispatch from CosmicTest when called from LanguageProvider
import {
  CHANGE_LOCALE,
} from 'containers/LanguageProvider/constants';

import {
  LIST_LOADED,
} from './constants';


// Initialize the state
const initialState = fromJS({
  loaded: false,
  timestamp: moment().unix(),
  localeChange: false,
  postList: [],
});

function cosmicTestReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LOADED: {
      // Set the timestamp to the time when this reducer was called, update the postList with the most recently pulled post previews
      return state
        .set('loaded', true)
        .set('timestamp', moment().unix())
        .set('localeChange', false)
        .set('postList', action.listData);
    }
    case CHANGE_LOCALE:
      return state
        .set('localeChange', true);
    default:
      return state;
  }
}

export default cosmicTestReducer;
