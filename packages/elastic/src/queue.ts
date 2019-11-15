import { Client } from '@elastic/elasticsearch';
import { sqs } from '@theunderscorer/playground-aws';

export const setupQueue = (elasticClient: Client) => {
  sqs.receiveMessage(message => {
    console.log('Message received: ', message);
  });
};
