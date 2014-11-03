var Pool = process.env.NODE_COV
  ? require('./lib-cov/pool').Pool
  : require('./lib/pool').Pool;

var Processor = process.env.NODE_COV
  ? require('./lib-cov/processor').Processor
  : require('./lib/processor').Processor;

var Worker = process.env.NODE_COV
  ? require('./lib-cov/worker').Worker
  : require('./lib/worker').Worker;

module.exports.Pool = Pool;
module.exports.Processor = Processor;
module.exports.Worker = Worker;
