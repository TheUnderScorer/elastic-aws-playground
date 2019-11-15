import { createClient, queueUrl } from './client';
import { AWSError, SQS } from 'aws-sdk';
import { MessageList } from 'aws-sdk/clients/sqs';

export interface QueueMessage<Payload = any> {
  type: string;
  payload: Payload;
}

export type ReceiveCallback<Payload> = (error: AWSError | null, message: QueueMessage<Payload> | null) => Promise<boolean>;

export class Service {
  public client: SQS = createClient();

  public send<T = any>(message: QueueMessage<T>) {
    return this.client
      .sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: queueUrl,
      })
      .promise();
  }

  public async receive<Payload = any>(callback: ReceiveCallback<Payload>) {
    try {
      const data = await this.client
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
          callback(null, body).then(result => {
            if (!result) {
              return;
            }

            this.client.deleteMessage({
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle as string,
            });
          }),
        );
      }
      await Promise.all(messagesPromises);
    } catch (e) {
      callback(e, null);
    }
  }
}
