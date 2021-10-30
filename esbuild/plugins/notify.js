const { log, err } = require('./utils.js');
const notify = {
  name: 'notify',
  setup(build) {
    build.onStart(() => {
      log('Build started');
    });
    build.onEnd(result => {
      if (result.errors.length > 0) {
        err('Error on build');
      } else {
        log(`Build ended with ${result.errors.length} errors`);
      }
    });
  },
};

module.exports = notify;
