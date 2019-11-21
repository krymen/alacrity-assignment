import { rawData, store } from '../../../src/model/Value';

describe('Value', () => {
  it('stores encrypted value', () => {
    const value = store('my-sample-key', { a: 'a', b: 'b', c: 'c' }, 'abc-123');

    expect(value).toEqual({
      id: 'my-sample-key',
      encrypted: expect.any(String),
      initializationVector: expect.any(String)
    });
  });

  it('gets raw value of encrypted value', () => {
    const data = { a: 'a', b: 'b', c: 1234 };
    const value = store('my-sample-key', data, 'abc-123');

    expect(rawData(value, 'abc-123')).toEqual(data);
  });
});
