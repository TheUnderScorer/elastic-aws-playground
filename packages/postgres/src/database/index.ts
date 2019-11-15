import {Connection, ConnectionOptions, createConnection} from 'typeorm';

export const connectToDatabase = (): Promise<Connection> => createConnection(connectionOptions);

export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: 'postgres://postgres:password@localhost:5432/app',
  synchronize: false,
  logging: true,
  entities: ['**/*.model.*'],
  migrations: ['**/migrations/*'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
