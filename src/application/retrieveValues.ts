import R from 'ramda';
import { rawData, ValueId, ValueRepository } from '../model/Value';

type IdOrWildcard = string;

interface RetrieveValuesParameters {
  id: IdOrWildcard;
  decryptionKey: string;
}

interface RetrieveValuesResult {
  id: ValueId;
  value: object;
}

type RetrieveValuesResults = RetrieveValuesResult[];

export type RetrieveValues = (
  repository: ValueRepository,
  parameters: RetrieveValuesParameters
) => Promise<RetrieveValuesResults>;

export const retrieveValues = R.curry<RetrieveValues>(async (repository, { id, decryptionKey }) =>
  (await repository.find(id)).map(value => ({ id: value.id, value: rawData(value, decryptionKey) }))
);
