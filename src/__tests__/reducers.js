import reducers from '../reducers';
import { SOME_ACTION } from '../actions';

describe('some actions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers(undefined, {}),
    ).toEqual(
      {
        someAction: 'no data',
      },
    );
  });

  it('should handle SOME_ACTION', () => {
    expect(
      reducers(undefined, {
        type: SOME_ACTION,
        someData: 'Run the tests',
      }),
    ).toEqual(
      {
        someAction: 'Run the tests',
      },
    );
  });
});
