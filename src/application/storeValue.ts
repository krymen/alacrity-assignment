import R from 'ramda';
import { store, ValueId, ValueRepository } from '../model/Value';

interface StoreValueParameters {
  id: ValueId;
  encryptionKey: string;
  value: object;
}

export type StoreValue = (repository: ValueRepository, parameters: StoreValueParameters) => Promise<void>;

export const storeValue = R.curry<StoreValue>(async (repository, { id, value, encryptionKey }) => {
  await repository.save(store(id, value, encryptionKey));
});
