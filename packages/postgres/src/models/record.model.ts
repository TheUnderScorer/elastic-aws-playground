import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

export interface RecordData {
  title: string;
  description: string;
}

@Entity()
export class RecordModel {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({
    type: 'jsonb',
  })
  public data!: RecordData;

  @CreateDateColumn()
  public createdAt!: Date;
}
