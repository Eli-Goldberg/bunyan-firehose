# bunyan-firehose

An AWS Firehose extension for the Bunyan logger

inspired by [[@crccheck/kinesis-streams](https://github.com/crccheck/kinesis-streams)]

Installing
----------

    npm install bunyan-firehose

Writeable stream
----------------

    'use strict'

    const bunyan         = require('bunyan')
    const bunyanFirehose = require('./src')

    const config = {
      streamName: 'logs-stream',
      region:     'eu-west-1',
      credentials: {
        accessKeyId:     '<ACCESS_KEY_ID',
        secretAccessKey: '<SECRET_ACCESS_KEY>',
        sessionToken:    '<SESSION_TOKEN>'
      }
    }

    const stream = bunyanFirehose.createStream(config)

    stream.on('error', (err) => console.error(`Firehose log error: `, err))

    const loggerConfig = {
      name:        'Firehose Demo App',
      level:       'info',
      serializers: bunyan.stdSerializers,
      streams: [
        { stream: process.stdout, level: 'info' },
        { stream, type: 'raw' }
      ]
    }

    const msg  = 'Well hello there, firehose!'
    const data = { bla: 'bla bla' }

    logger.info({ msg, data })
    logger.info('Simple strings are converted to objects in bunyan')
    logger.warn('This is a warning')
