import { SOME_ACTION, someAction } from '../actions';

describe('actions', () => {
  it('should create some action that accespts some data', () => {
    const someData = 'some data';
    const expectedAction = {
      type: SOME_ACTION,
      someData
    };
    expect(someAction(someData)).toEqual(expectedAction);
  });
});
