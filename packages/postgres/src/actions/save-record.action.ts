import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { RecordModel } from '../models/record.model';

export const saveRecordAction = (repository: Repository<RecordModel>) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
