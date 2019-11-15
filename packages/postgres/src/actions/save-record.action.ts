import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { RecordModel } from '../models/record.model';
import { QueueMessage, Service } from '@theunderscorer/playground-aws';

export const saveRecordAction = (repository: Repository<RecordModel>, sqs: Service) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data } = req.body;

  const record = new RecordModel();
  record.data = data;

  await repository.save(record);

  const message: QueueMessage<RecordModel> = {
    type: 'RecordCreated',
    payload: record,
  };

  sqs
    .send(message)
    .then(message => console.log('Message sent:', message))
    .catch(err => console.error('Unable to send message:', err));

  return res.status(201).json({
    result: record,
  });
};
