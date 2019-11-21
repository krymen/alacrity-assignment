import express from 'express';
import { check, validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';
import { storeValue } from './application/storeValue';
import { InMemoryValueRepository } from './infrastructure/repository/InMemoryValueRepository';

const app = express();

const valueRepository = new InMemoryValueRepository();
const storeValueUseCase = storeValue(valueRepository);

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.put(
  '/:id',
  [check('encryption_key').isString(), check('value').isJSON()],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    await storeValueUseCase({ id: req.params.id, value: req.body.value, encryptionKey: req.body.encryption_key });

    res.status(HttpStatus.NO_CONTENT).send();
  }
);

export default app;
