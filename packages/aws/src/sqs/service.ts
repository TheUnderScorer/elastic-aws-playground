import { createClient, queueUrl } from './client';
import { AWSError, SQS } from 'aws-sdk';
import { updateAwsCredentials } from '../aws-setup';
import { Consumer } from 'sqs-consumer';

export interface QueueMessage<Payload = any> {
  type: string;
  payload: Payload;
}

export type ReceiveCallback<Payload> = (
  error: AWSError | null,
  message: QueueMessage<Payload> | null,
) => Promise<void>;

export class Service {
  private readonly client: SQS;
  private static credentialsSet: boolean = false;

  public constructor(client?: SQS) {
    if (!Service.credentialsSet) {
      updateAwsCredentials();

      Service.credentialsSet = true;
    }

    this.client = client ? client : createClient();
  }

  public send<T = any>(message: QueueMessage<T>) {
    return this.client
      .sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: queueUrl,
      })
      .promise();
  }

  public async receive<Payload = any>(callback: ReceiveCallback<Payload>): Promise<Consumer> {
    const consumer = Consumer.create({
      queueUrl,
      sqs: this.client,
      async handleMessage(message: SQS.Message): Promise<void> {
        const body = JSON.parse(message.Body as string);

        await callback(null, body);
      },
    });

    consumer.on('error', err => {
      callback(err, null);

      consumer.start();
    });

    consumer.start();

    return consumer;
  }
}
