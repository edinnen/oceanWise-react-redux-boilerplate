/*
 *
 * Cmspage actions
 *
 */

import {
  DEFAULT_ACTION,
  LIST_LOADED,
  PAGE_LOADED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function listLoaded(listData) {
  return {
    type: LIST_LOADED,
    listData,
  };
}

export function pageLoaded(slug, data) {
  return {
    type: PAGE_LOADED,
    slug,
    data,
  };
}
