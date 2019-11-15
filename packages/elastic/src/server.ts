import { Client } from '@elastic/elasticsearch';
import Express, { Application, Request, Response } from 'express';

const index = 'quotes';
const port = 3000;

export const startServer = (client: Client): Application => {
  const app = Express();

  app.use(Express.json());

  app.get('/search', async (req: Request, res: Response) => {
    const { query, fields = '' } = req.query;

    const { body } = await client.search({
      body: {
        query: {
          multi_match: {
            query,
            fields: fields.split(','),
          },
        },
      },
    });

    return res.json(body);
  });

  app.post('/add', async (req: Request, res: Response) => {
    const { author, quote } = req.body;

    const { body } = await client.index({
      index,
      body: {
        author,
        quote,
      },
    });

    return res.json(body);
  });

  app.listen(port, () => console.log('Elastic started on port: ', port));

  return app;
};
