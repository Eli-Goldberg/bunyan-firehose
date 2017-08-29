const FirehoseStream = require('./firehoseStream');

function createFirehoseStream(...args) {
  return new FirehoseStream(...args);
}

module.exports = {
  createFirehoseStream
};
