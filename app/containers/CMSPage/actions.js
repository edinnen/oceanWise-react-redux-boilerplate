/*
 *
 * Cmspage actions
 *
 */

import {
  DEFAULT_ACTION,
  PAGE_LOADED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function pageLoaded(slug, data) {
  return {
    type: PAGE_LOADED,
    slug,
    data,
  };
}
