import { QueueHandler } from './index';
import { RecordModel } from '@theunderscorer/playground-postgres';

export const handleRecord: QueueHandler<RecordModel> = elasticClient => async message => {
  const result = await elasticClient.index({
    index: 'record-model',
    body: {
      ...message.payload,
    },
  });

  console.log('Record saved in elastic search: ', result);
};
