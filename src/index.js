'use strict'

const FirehoseStream = require('./firehoseStream')

function createStream(...args) {
  return new FirehoseStream(...args)
}

module.exports = {
  createStream
}
