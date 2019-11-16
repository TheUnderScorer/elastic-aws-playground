import { Client } from '@elastic/elasticsearch';
import { Service } from '@theunderscorer/playground-aws';
import { createHandlers } from './handlers';
import { QueueTypes } from './queue-types.enum';

export const setupQueue = (elasticClient: Client) => {
  const service = new Service();
  const handlers = createHandlers(elasticClient);

  service.receive(async (error, message) => {
    if (error) {
      console.error('Queue error:', error);

      return;
    }

    if (!message) {
      return;
    }

    console.log('Received message from queue:', message);

    if (handlers[message.type as QueueTypes]) {
      handlers[message.type as QueueTypes](message);
    }
  });
};
