import HttpStatus from 'http-status-codes';
import request from 'supertest';
import app from '../../src/app';

describe('Encrypted key-value store API', () => {
  it('stores values', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 'abc-123',
        value: JSON.stringify({ a: 1, b: 'string' })
      });

    expect(response.status).toEqual(HttpStatus.NO_CONTENT);
  });

  it('returns bad request if encryption key is not a string', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 1,
        value: JSON.stringify({ a: 1, b: 'string' })
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('returns bad request if no encryption key provided', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        value: JSON.stringify({ a: 1, b: 'string' })
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('returns bad request if value is not of JSON type', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 'abc-123',
        value: 'not_json'
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('returns bad request if no value provided', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 'abc-123'
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });
});
