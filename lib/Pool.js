var Worker = require('./Worker').Worker;

function Pool(job) {
	this.instances = [];
	this.job = job;
}

Pool.prototype.getWorker = function () {
	if (this.instances.length > 0) {
		return this.instances.pop();
	}

	return new Worker(this.job);
};

Pool.prototype.dispose = function (worker) {
	this.instances.push(worker);
};

module.exports.Pool = Pool;
