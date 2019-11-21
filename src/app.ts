import express from 'express';
import { check, validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';
import { retrieveValues } from './application/retrieveValues';
import { storeValue } from './application/storeValue';
import { createLogger } from './infrastructure/logger';
import { InMemoryValueRepository } from './infrastructure/repository/InMemoryValueRepository';

const app = express();

const logger = createLogger(app.get('env') === 'development');
const valueRepository = new InMemoryValueRepository();
const storeValueUseCase = storeValue(valueRepository);
const retrieveValuesUseCase = retrieveValues(valueRepository, logger);

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.put(
  '/:id',
  [
    check('encryption_key').isString(),
    check('value', 'value should be JSON type').custom(value => typeof value === 'object')
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    await storeValueUseCase({ id: req.params.id, value: req.body.value, encryptionKey: req.body.encryption_key });

    res.status(HttpStatus.NO_CONTENT).send();
  }
);

app.get('/:id', async (req, res) => {
  const values = await retrieveValuesUseCase({ id: req.params.id, decryptionKey: req.query.decryption_key ?? '' });

  res.status(HttpStatus.OK).json(values);
});

export default app;
