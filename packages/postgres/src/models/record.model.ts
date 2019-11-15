import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class RecordModel {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({
    type: 'jsonb',
  })
  public data!: object;

  @CreateDateColumn()
  public createdAt!: Date;
}
