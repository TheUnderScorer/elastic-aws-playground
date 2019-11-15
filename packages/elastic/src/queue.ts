import { Client } from '@elastic/elasticsearch';
import { createService } from '@theunderscorer/playground-aws';

export const setupQueue = (elasticClient: Client) => {
  const service = createService();

  service.receive(async (error, message) => {
    if (error) {
      console.error('Queue error:', error);

      return;
    }

    console.log('Received message:', message);
  });
};
