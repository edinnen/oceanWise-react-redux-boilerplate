/*
 *
 * Post actions
 *
 */

import {
  DEFAULT_ACTION,
  POST_LOADED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function postLoaded(slug, data) {
  return {
    type: POST_LOADED,
    slug,
    data,
  };
}
