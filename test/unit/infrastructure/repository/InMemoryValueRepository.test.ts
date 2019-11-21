import { InMemoryValueRepository } from '../../../../src/infrastructure/repository/InMemoryValueRepository';
import { Value } from '../../../../src/model/Value';

const value: Value = {
  id: 'some-id',
  encrypted: 'asd1231asf',
  initializationVector: 'abc'
};

describe('InMemoryValueRepository', () => {
  let repository: InMemoryValueRepository;

  beforeEach(() => {
    repository = new InMemoryValueRepository();
  });

  it('saves value', async () => {
    await repository.save(value);

    await expect(repository.all()).resolves.toEqual([value]);
  });
});
