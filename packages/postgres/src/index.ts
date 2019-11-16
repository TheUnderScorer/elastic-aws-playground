import { startServer } from './server';

startServer().catch(console.error);

export * from './models/record.model';
