import R from 'ramda';
import { Logger } from 'winston';
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
  logger: Logger,
  parameters: RetrieveValuesParameters
) => Promise<RetrieveValuesResults>;

export const retrieveValues = R.curry<RetrieveValues>(async (repository, logger, { id, decryptionKey }) =>
  (await repository.find(id))
    .map(value => {
      const data = rawData(value, decryptionKey);

      if (data === undefined) {
        logger.info('Trying to retrieve value with id "%s" using invalid decryption key.', value.id);
      }

      return { id: value.id, value: data };
    })
    .filter(({ value }) => value !== undefined) as RetrieveValuesResults
);
