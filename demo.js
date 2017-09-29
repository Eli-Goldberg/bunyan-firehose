'use strict'

const bunyan         = require('bunyan')
const bunyanFirehose = require('./src')
const AWS            = require('aws-sdk')

const config = {
  streamName:  'logs-stream',
  region:      'eu-west-1',
  credentials: new AWS.Credentials({
    accessKeyId:     '<ACCESS_KEY_ID',
    secretAccessKey: '<SECRET_ACCESS_KEY>',
    sessionToken:    '<SESSION_TOKEN>'
  })
}

function createLogger(name) {
  if (!name) throw new Error(`Missing 'name' in config`)

  const stream = bunyanFirehose.createStream(config)

  stream.on('error', (err) => console.error(`Firehose log error: `, err))

  const loggerConfig = {
    name:        name,
    level:       'info',
    serializers: bunyan.stdSerializers,
    streams: [
      { stream: process.stdout, level: 'info' },
      { stream, type: 'raw' }
    ]
  }

  return bunyan.createLogger(loggerConfig)
}

(function() {
  const logger = createLogger('Firehose Demo App')

  const msg  = 'Well hello there, firehose!'
  const data = { demo: 'data' }

  logger.info({ msg, data })
  logger.info('Simple strings are converted to objects in bunyan')
  logger.warn('This is a warning')
})()
