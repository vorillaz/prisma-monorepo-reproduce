import compose from '@demo/build';

const port = process.env.PORT || 7002;
const app = compose({ name: 'App working' })
  .attach(require('./test'))
  .build()
  .start(port);
export default app;
