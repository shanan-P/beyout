import { ServerOptions } from 'socket.io';
import { corsConfig } from './cors';

export const socketConfig: Partial<ServerOptions> = {
  cors: {
    origin: corsConfig.origin,
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
};