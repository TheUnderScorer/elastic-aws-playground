import Express, { Application } from 'express';
import { saveRecordAction } from './actions/save-record.action';
import { connectToDatabase } from './database';
import { RecordModel } from './models/record.model';

const port = 9000;

export const startServer = async (): Promise<Application> => {
  const app = Express();
  const router = Express.Router();

  const database = await connectToDatabase();
  const repository = database.getRepository(RecordModel);

  app.use(Express.json());
  router.post('/create', saveRecordAction(repository));
  app.use(router);
  app.listen(port, () => console.log('Postgres server started on port:', port));

  return app;
};
