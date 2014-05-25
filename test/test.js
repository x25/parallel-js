var Processor = require('./../lib').Processor;

module.exports = {
	setUp: function (callback) {
		callback();
	},

	tearDown: function (callback) {
		// clean up
		callback();
	},

	testProcessor: function (test) {
		test.expect(2);

		var n = 1;

		var job = function (data, next) {
			test.equal('data' + (n++), data);
			next();
		};

		var processor = new Processor(job);

		processor.process('data1');
		processor.process('data2');

		test.done();
	}
};
