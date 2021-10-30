import { FastifyPluginCallback } from 'fastify';

const mod: FastifyPluginCallback = (app, _opts = {}, next) => {
  const prisma = app.prisma;
  app.get('/test-prisma', async (_req, reply) => {
    const res = await prisma.test.findMany();
    reply.send(res);
  });

  app.get('/', async (_req, reply) => {
    reply.send({
      hello: 'home',
      msg: 'another one bites the dust kjghfdshjgb',
    });
  });

  next();
};

export default mod;
