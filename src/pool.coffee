Worker = require('./worker').Worker

class Pool
  constructor: (@job) ->
    @instances = []

  getWorker: ->
    return @instances.pop() if @instances.length

    new Worker @job

  dispose: (worker) ->
    @instances.push worker

module.exports.Pool = Pool
