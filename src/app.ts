import express from 'express';
import { check, validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.put(
  '/:id',
  [check('encryption_key').isString(), check('value').isJSON()],
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
);

export default app;
