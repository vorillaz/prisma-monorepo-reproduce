import { FastifyPluginCallback } from 'fastify';

const mod: FastifyPluginCallback = (app, _opts = {}, next) => {
  app.get('/test-route', async (_req, reply) => {
    reply.send({ hello: 'world from testing env' });
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
