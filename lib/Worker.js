function Worker(job) {
	this.job = job;
	this.numRetries = 0;
}

Worker.prototype.run = function (payload, callback) {
	this.job(payload, callback);
};

module.exports.Worker = Worker;
