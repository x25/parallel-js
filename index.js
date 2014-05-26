var Pool = process.env.NODE_COV
  ? require('./lib-cov/Pool').Pool
  : require('./lib/Pool').Pool;

var Processor = process.env.NODE_COV
  ? require('./lib-cov/Processor').Processor
  : require('./lib/Processor').Processor;

var Worker = process.env.NODE_COV
  ? require('./lib-cov/Worker').Worker
  : require('./lib/Worker').Worker;

module.exports.Pool = Pool;
module.exports.Processor = Processor;
module.exports.Worker = Worker;
