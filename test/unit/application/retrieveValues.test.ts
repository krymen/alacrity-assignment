import winston from 'winston';
import { retrieveValues } from '../../../src/application/retrieveValues';
import { InMemoryValueRepository } from '../../../src/infrastructure/repository/InMemoryValueRepository';
import { store } from '../../../src/model/Value';
import { InMemoryWinstonTransport } from '../../common/InMemoryWinstonTransport';

describe('Retrieve values use case', () => {
  let repository: InMemoryValueRepository;

  const inMemoryLogs = new InMemoryWinstonTransport();
  const logger = winston.createLogger({ transports: [inMemoryLogs] });

  beforeEach(() => {
    repository = new InMemoryValueRepository();

    inMemoryLogs.clear();
  });

  it('retrieves value with the exact id', async () => {
    const data = { a: 's', b: 123 };
    const id = 'test-id';
    const key = 'my-key';

    await repository.save(store(id, data, key));

    await expect(retrieveValues(repository, logger, { id, decryptionKey: key })).resolves.toEqual([
      { id, value: data }
    ]);
  });

  it('does not retrieve value with invalid decryption key but logs the error', async () => {
    const data = { a: 's', b: 123 };
    const id = 'test-id';

    await repository.save(store(id, data, 'my-key'));

    await expect(retrieveValues(repository, logger, { id, decryptionKey: 'invalid' })).resolves.toEqual([]);
    expect(inMemoryLogs.logs).toHaveLength(1);
  });
});
