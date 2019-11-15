import { client, queueUrl } from './client';
import { AWSError } from 'aws-sdk';
import { MessageList, SendMessageResult } from 'aws-sdk/clients/sqs';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface QueueMessage<Payload = any> {
  type: string;
  payload: Payload;
}

export interface SQSService {
  send<T = any>(message: QueueMessage): Promise<PromiseResult<SendMessageResult, AWSError>>;
  receive<Payload = any>(callback: ReceiveCallback<Payload>): Promise<void>;
}

export type ReceiveCallback<Payload> = (error: AWSError | null, message: QueueMessage<Payload> | null) => Promise<any>;

export const createService = (): SQSService => ({
  send<T = any>(message: QueueMessage<T>) {
    return client
      .sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: queueUrl,
      })
      .promise();
  },
  async receive<Payload = any>(callback: ReceiveCallback<Payload>) {
    try {
      const data = await client
        .receiveMessage({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 5,
        })
        .promise();

      if (!data.Messages || !data.Messages.length) {
        callback(null, null);

        return;
      }

      const messages = data.Messages as MessageList;
      const messagesPromises: Array<Promise<any>> = [];

      for (const message of messages) {
        const body = JSON.parse(message.Body as string);

        messagesPromises.push(
          callback(null, body).then(() =>
            client.deleteMessage({
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle as string,
            }),
          ),
        );
      }
      await Promise.all(messagesPromises);
    } catch (e) {
      callback(e, null);
    }
  },
});
