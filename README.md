# bunyan-firehose

An AWS Firehose extension for the Bunyan logger

inspired by [[@crccheck/kinesis-streams](https://github.com/crccheck/kinesis-streams)]

Installing
----------

    npm install bunyan-firehose

Writeable stream
----------------

    const bunyan = require('bunyan');
    const { createFirehoseStream } = require('bunyan-firehose');

    const firehoseConfig = {
      accessKeyId: '<YOUR-ACCESS_KEY_ID',
      secretAccessKey: '<YOUR_SECRET_ACCESS_KEY>',
      streamName: 'logs-stream',
      region: 'eu-west-1'
    };

    const logger = bunyan.createLogger({
      name: name,
      level: 'info',
      serializers: bunyan.stdSerializers,
      streams: [
        { stream: process.stdout, level: 'info' },
        { 
          stream: createFirehoseStream(firehoseConfig), 
          type: 'raw' 
        }
      ]
    });

    logger.info({ msg: 'Writing info here', data: 'bla' });
    logger.info('A regular string converted to json');
    logger.warn('A simple warning');

