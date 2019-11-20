import request from 'supertest';
import app from '../../src/app';

describe('Encrypted key-value store API', () => {

  it('returns hello world', async () => {
    const response = await request(app).get('/');

    expect(response.text).toEqual('Hello World!');
  });
});
