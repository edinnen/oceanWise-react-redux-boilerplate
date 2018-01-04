
import {
  listLoaded,
  postLoaded,
} from '../actions';
import {
  POST_LOADED,
  LIST_LOADED,
} from '../constants';

describe('CosmicTest actions', () => {
  describe('Post Loaded Action', () => {
    it('has a type of POST_LOADED', () => {
      const expected = {
        type: POST_LOADED,
      };
      expect(postLoaded()).toEqual(expected);
    });
  });
  describe('List Loaded Action', () => {
    it('has a type of LIST_LOADED', () => {
      const expected = {
        type: LIST_LOADED,
      };
      expect(listLoaded()).toEqual(expected);
    });
  });
});
