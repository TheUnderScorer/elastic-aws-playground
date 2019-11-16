import { Client } from '@elastic/elasticsearch';
import Express, { Application, Request, Response } from 'express';

const index = 'record-model';
const port = 3000;

export const startServer = (client: Client): Application => {
  const app = Express();

  app.use(Express.json());

  app.get('/search', async (req: Request, res: Response) => {
    const { title, description } = req.query;

    try {
      const { body } = await client.search({
        index,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    'data.title': title,
                  },
                },
                {
                  match: {
                    'data.description': description,
                  },
                },
              ],
            },
          },
        },
      });

      return res.json({
        payload: body,
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  });

  app.get('/all', async (req: Request, res: Response) => {
    const all = await client.search({
      index,
      from: 0,
    });

    return res.json({
      payload: all,
    });
  });

  app.listen(port, () => console.log('Elastic started on port: ', port));

  return app;
};
