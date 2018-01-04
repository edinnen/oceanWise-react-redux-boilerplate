/*
 *
 * CosmicTest actions
 *
 */

import {
  LIST_LOADED,
  POST_LOADED,
} from './constants';

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} listData The JSON data with post preview content (slug, title, etc.)
 *
 * @return {object}          An action object with a type of LIST_LOADED passing the repos
 */
export function listLoaded(listData) {
  return {
    type: LIST_LOADED,
    listData,
  };
}

export function postLoaded(slug, data) {
  return {
    type: POST_LOADED,
    slug,
    data,
  };
}
