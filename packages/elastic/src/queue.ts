import { Client } from '@elastic/elasticsearch';
import { Service } from '@theunderscorer/playground-aws';

export const setupQueue = (elasticClient: Client) => {
  const service = new Service();

  service.receive(async (error, message) => {
    if (error) {
      console.error('Queue error:', error);

      return false;
    }

    console.log('Received message:', message);

    return true;
  });
};
