import { InMemoryValueRepository } from '../../../../src/infrastructure/repository/InMemoryValueRepository';
import { Value } from '../../../../src/model/Value';

const value1: Value = {
  id: 'some-id',
  encrypted: 'asd1231asf',
  initializationVector: 'abc'
};

const value2: Value = {
  id: 'some-id-2',
  encrypted: 'adf91231',
  initializationVector: 'aazz'
};

const value3: Value = {
  id: 'different-id',
  encrypted: '12312asdfasf',
  initializationVector: '02312aa'
};

describe('InMemoryValueRepository', () => {
  let repository: InMemoryValueRepository;

  beforeEach(() => {
    repository = new InMemoryValueRepository();
  });

  it('saves a value', async () => {
    await repository.save(value1);

    await expect(repository.all()).resolves.toEqual([value1]);
  });

  it('finds a value with exact id', async () => {
    await repository.save(value1);
    await repository.save(value2);

    await expect(repository.find(value1.id)).resolves.toEqual([value1]);
  });

  it('finds values with wildcard id', async () => {
    await repository.save(value1);
    await repository.save(value2);
    await repository.save(value3);

    await expect(repository.find('some-id*')).resolves.toEqual([value1, value2]);
  });

  it('finds a value with asterisk in id', async () => {
    const id = 'id-with-*';
    const valueWithAsterisk = {
      id,
      encrypted: 'asd1231asf',
      initializationVector: 'abc'
    };

    await repository.save(valueWithAsterisk);

    await expect(repository.find('id-with-*')).resolves.toEqual([valueWithAsterisk]);
  });
});
