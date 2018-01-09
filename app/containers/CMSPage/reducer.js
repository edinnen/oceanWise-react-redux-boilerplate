/*
 *
 * Cmspage reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';

import {
  CHANGE_LOCALE,
} from 'containers/LanguageProvider/constants';

import {
  DEFAULT_ACTION,
  LIST_LOADED,
  PAGE_LOADED,
} from './constants';

const initialState = fromJS({
  timestamp: moment().unix(),
  pageList: [],
  localeChange: false,
});

function cmspageReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LOADED:
      return state
        .set('timestamp', moment().unix())
        .set('localeChange', false)
        .set('pageList', action.listData);
    case PAGE_LOADED:
      return state
        .set('pageData', action.data);
    case CHANGE_LOCALE:
      return state
        .set('localeChange', true);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cmspageReducer;
