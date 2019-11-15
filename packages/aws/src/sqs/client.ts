import { SQS } from 'aws-sdk';

export const endpoint = 'http://localhost:4576';
export const queueUrl = `${endpoint}/queue/playground`;

export const createClient = () => new SQS({
  endpoint,
  region: 'us-east-1',
  apiVersion: 'latest',
});
