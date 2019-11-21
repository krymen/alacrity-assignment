import { retrieveValues } from '../../../src/application/retrieveValues';
import { InMemoryValueRepository } from '../../../src/infrastructure/repository/InMemoryValueRepository';
import { store } from '../../../src/model/Value';

describe('Retrieve values use case', () => {
  let repository: InMemoryValueRepository;

  beforeEach(() => {
    repository = new InMemoryValueRepository();
  });

  it('retrieves value with the exact id', async () => {
    const data = { a: 's', b: 123 };
    const id = 'test-id';
    const key = 'my-key';

    await repository.save(store(id, data, key));

    await expect(retrieveValues(repository, { id, decryptionKey: key })).resolves.toEqual([{ id, value: data }]);
  });
});
