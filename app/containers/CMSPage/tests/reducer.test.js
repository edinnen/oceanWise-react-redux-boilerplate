
import { fromJS } from 'immutable';
import cmspageReducer from '../reducer';

describe('cmspageReducer', () => {
  it('returns the initial state', () => {
    expect(cmspageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
