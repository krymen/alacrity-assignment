import HttpStatus from 'http-status-codes';
import request from 'supertest';
import app from '../../src/app';

describe('Encrypted key-value store API', () => {
  it('stores values', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 'abc-123',
        value: { a: 1, b: 'string' }
      });

    expect(response.status).toEqual(HttpStatus.NO_CONTENT);
  });

  it('retrieves value', async () => {
    const data = { a: 1, b: 'string' };
    const encryptionKey = 'abc-123';

    await request(app)
      .put('/key2')
      .send({
        encryption_key: encryptionKey,
        value: data
      });

    const response = await request(app).get(`/key2?decryption_key=${encryptionKey}`);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toEqual([{ id: 'key2', value: data }]);
  });

  it('retrieves no value if invalid decryption key given', async () => {
    const data = { a: 1, b: 'string' };

    await request(app)
      .put('/key2')
      .send({
        encryption_key: 'abc-123',
        value: data
      });

    const response = await request(app).get('/key2?decryption_key=invalid');

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it('retrieves many values if wildcard query given', async () => {
    const data1 = { a: 1, b: 'string1' };
    const data2 = { a: 2, b: 'string2' };
    const encryptionKey = 'abc-123';

    await request(app)
      .put('/key2')
      .send({
        encryption_key: encryptionKey,
        value: data1
      });

    await request(app)
      .put('/key3')
      .send({
        encryption_key: encryptionKey,
        value: data2
      });

    const response = await request(app).get(`/key*?decryption_key=${encryptionKey}`);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toEqual([
      { id: 'key2', value: data1 },
      { id: 'key3', value: data2 }
    ]);
  });

  it('returns bad request if encryption key is not a string when storing value', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 1,
        value: { a: 1, b: 'string' }
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('returns bad request if no encryption key provided when storing value', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        value: { a: 1, b: 'string' }
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('returns bad request if value is not of JSON type when storing value', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 'abc-123',
        value: 'not_json'
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('returns bad request if no value provided when storing value', async () => {
    const response = await request(app)
      .put('/my-sample-key')
      .send({
        encryption_key: 'abc-123'
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
  });
});
