import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { RecordModel } from '../models/record.model';
import { SQS } from 'aws-sdk';

export const saveRecordAction = (repository: Repository<RecordModel>, sqs: SQS) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data } = req.body;

  const record = new RecordModel();
  record.data = data;

  await repository.save(record);

  return res.status(201).json({
    result: record,
  });
};
