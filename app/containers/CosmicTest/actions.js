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

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} postData The JSON data with the full post content
 *
 * @return {object}          An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function postLoaded(postData) {
  return {
    type: POST_LOADED,
    postData,
  };
}
