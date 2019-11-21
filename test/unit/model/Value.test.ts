import { store } from '../../../src/model/Value';

describe('Value', () => {
  it('stores encrypted value', () => {
    const value = store('my-sample-key', { a: 'a', b: 'b', c: 'c' }, 'abc-123');

    expect(value).toEqual({
      id: 'my-sample-key',
      encrypted: expect.any(String),
      initializationVector: expect.any(String)
    });
  });
});
