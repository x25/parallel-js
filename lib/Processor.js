var Pool = require('./Pool').Pool;

function Processor(job, maxProcesses, numRetries) {
	this.pool = new Pool(job);
	this.processing = 0;

	this.maxProcesses = 3;
	this.numRetries = 2;

	if (typeof maxProcesses != 'undefined')
		this.maxProcesses = maxProcesses;

	if (typeof numRetries != 'undefined')
		this.numRetries = numRetries;

	this.waitingQueue = [];
}

Processor.prototype.process = function (payload) {
	if (this.processing++ < this.maxProcesses) {
		this.createWorker(payload);
	} else {
		this.pushToWaitingQueue(payload);
	}
};

Processor.prototype.createWorker = function (payload) {
	var self = this;

	var worker = this.pool.getWorker();
	worker.numRetries = this.numRetries;

	var job = function (err) {
		if (typeof err != 'undefined' && worker.numRetries-- > 0) {
			worker.run(payload, job);
			return;
		}

		self.processing--;
		self.pool.dispose(worker);

		if (self.waitingQueue.length > 0) {
			self.createWorker(self.popFromWaitingQueue());
		}
	};

	worker.run(payload, job);
};

Processor.prototype.pushToWaitingQueue = function (payload) {
	this.waitingQueue.push(payload);
};

Processor.prototype.popFromWaitingQueue = function () {
	return this.waitingQueue.shift();
};

module.exports.Processor = Processor;
