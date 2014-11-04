class Worker
  constructor: (@job, @numRetries = 0) ->

  run: (callback, args) ->
    a = Array.prototype.slice.call args, 0
    a.unshift callback
    @job.apply undefined, a

module.exports.Worker = Worker
