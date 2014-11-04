Pool = require('./pool').Pool

class Processor

  constructor: (job, @maxProcesses = 1, @numRetries = 0) ->
    @pool = new Pool job
    @processing = 0
    @waitingQueue = []

  run: () ->
    if @processing++ < @maxProcesses
      @createWorker arguments
    else
      @pushToWaitingQueue arguments

  createWorker: (args) ->
    self = @
    worker = @pool.getWorker();
    worker.numRetries = @numRetries;

    job = (err) ->
      if err and worker.numRetries-- > 0
        worker.run job, args
        return

      self.processing--
      self.pool.dispose worker

      if self.waitingQueue.length
        self.createWorker self.popFromWaitingQueue()

    worker.run job, args

  pushToWaitingQueue: (args) ->
    @waitingQueue.push args

  popFromWaitingQueue: ->
    @waitingQueue.shift()

module.exports.Processor = Processor;
