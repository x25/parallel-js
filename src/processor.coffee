Pool = require('./pool').Pool

class Processor
  constructor: (@job, @maxProcesses = 3, @numRetries = 2) ->
    @pool = new Pool @job
    @processing = 0
    @waitingQueue = []

  process: (payload) ->
    if @processing++ < @maxProcesses
      @createWorker payload
    else
      @pushToWaitingQueue payload

  createWorker: (payload) ->
    self = @
    worker = @pool.getWorker();
    worker.numRetries = @numRetries;

    job = (err) ->
      if err and worker.numRetries-- > 0
        worker.run payload, job
        return

      self.processing--
      self.pool.dispose worker

      if self.waitingQueue.length
        self.createWorker self.popFromWaitingQueue()

    worker.run payload, job

  pushToWaitingQueue: (payload) ->
    @waitingQueue.push payload

  popFromWaitingQueue: ->
    @waitingQueue.shift()

module.exports.Processor = Processor;
