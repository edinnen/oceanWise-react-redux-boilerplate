
import { fromJS } from 'immutable';
import cosmicTestReducer from '../reducer';

describe('cosmicTestReducer', () => {
  it('returns the initial state', () => {
    expect(cosmicTestReducer(undefined, {})).toEqual(fromJS({}));
  });
});
