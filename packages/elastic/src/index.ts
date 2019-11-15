import { Client } from '@elastic/elasticsearch';
import { startServer } from './server';
import { setupQueue } from './queue';

const main = async () => {
  const client = new Client({ node: 'http://localhost:9200' });
  await startServer(client);

  setupQueue(client);
};

main().catch(console.error);
