const bunyan = require('bunyan');
const { createFirehoseStream } = require('./src');

const firehoseConfig = {
  accessKeyId: '<YOUR-ACCESS_KEY_ID',
  secretAccessKey: '<YOUR_SECRET_ACCESS_KEY>',
  streamName: 'logs-stream',
  region: 'eu-west-1'
};

function createLogger(name) {
  if (!name) throw new Error(`Missing 'name' in config`);
  const loggerConfig = {
    name: name,
    level: 'info',
    serializers: bunyan.stdSerializers,
    streams: [
      { stream: process.stdout, level: 'info' },
      { stream: createFirehoseStream(firehoseConfig), type: 'raw' }
    ]
  };
  return bunyan.createLogger(loggerConfig);
}

(function() {
  const logger = createLogger('My App');
  logger.info({ msg: 'Well hello there, firehose !', data: { bla: 'bla bla' } });
  logger.info('simple strings are converted to objects in bunyan');
  logger.warn('A warning');
})();
