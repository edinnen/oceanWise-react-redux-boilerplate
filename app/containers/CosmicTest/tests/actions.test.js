
import {
  listLoaded,
} from '../actions';
import {
  LIST_LOADED,
} from '../constants';

describe('CosmicTest actions', () => {
  describe('List Loaded Action', () => {
    it('has a type of LIST_LOADED', () => {
      const expected = {
        type: LIST_LOADED,
      };
      expect(listLoaded()).toEqual(expected);
    });
  });
});
