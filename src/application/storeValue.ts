import R from 'ramda';
import { store, ValueRepository } from '../model/Value';

interface StoreValueParameters {
  id: string;
  encryptionKey: string;
  value: object;
}

type StoreValue = (repository: ValueRepository, parameters: StoreValueParameters) => Promise<void>;

export const storeValue = R.curry<StoreValue>(async (repository, { id, value, encryptionKey }) => {
  await repository.save(store(id, value, encryptionKey));
});
