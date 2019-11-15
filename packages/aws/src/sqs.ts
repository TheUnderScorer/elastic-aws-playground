import { SQS } from 'aws-sdk';

const sqs = new SQS({
  endpoint: 'http://localhost:4576/',
  region: 'us-east-1',
  apiVersion: 'latest',
});

export default sqs;
