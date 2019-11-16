import { Client } from '@elastic/elasticsearch';
import { QueueTypes } from '../queue-types.enum';
import { QueueMessage } from '@theunderscorer/playground-aws';
import { handleRecord } from './record-created.handler';

export type QueueHandler<Payload = any> = (elasticClient: Client) => QueueMessageHandler<Payload>;
export type QueueMessageHandler<Payload = any> = (message: QueueMessage<Payload>) => any;

export const createHandlers = (elasticClient: Client): Record<QueueTypes, QueueMessageHandler> => ({
  [QueueTypes.RecordCreated]: handleRecord(elasticClient),
});
