
import {
  listLoaded,
} from '../actions';
import {
  POST_LOADED,
} from '../constants';

describe('CosmicTest actions', () => {
  describe('Post Loaded Action', () => {
    it('has a type of POST_LOADED', () => {
      const expected = {
        type: POST_LOADED,
      };
      expect(listLoaded()).toEqual(expected);
    });
  });
});
