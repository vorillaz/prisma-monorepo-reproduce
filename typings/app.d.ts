import { PrismaClient } from '@prisma/client';

import {
  FastifyRequest,
  FastifyReply,
  preHandlerHookHandler,
  FastifyInstance,
} from 'fastify';

interface DemoInstance {
  appName: string;
  prisma: PrismaClient;
}

declare module 'fastify' {
  interface FastifyInstance extends DemoInstance {}
}
