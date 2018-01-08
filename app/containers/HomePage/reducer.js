/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import moment from 'moment';

import {
  CHANGE_LOCALE,
} from 'containers/LanguageProvider/constants';

import {
  CHANGE_USERNAME,
  LIST_LOADED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  timestamp: moment().unix(),
  pageList: [],
  localeChange: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    case LIST_LOADED:
      return state
        .set('timestamp', moment().unix())
        .set('localeChange', false)
        .set('pageList', action.listData);
    case CHANGE_LOCALE:
      return state
        .set('localeChange', true);
    default:
      return state;
  }
}

export default homeReducer;
