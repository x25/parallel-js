class Worker
  constructor: (@job, @numRetries = 0) ->

  run: (payload, callback) ->
    @job payload, callback

module.exports.Worker = Worker
