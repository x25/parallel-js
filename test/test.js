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
		test.expect(3);

		var n = 0;

		var job = function (data, next) {
			if (!n) {
				test.equal('data' + (++n), data);
				next('error');
			} else {
				test.equal('data' + (n++), data);
				next();
			}
		};

		var processor = new Processor(job);

		processor.process('data1');
		processor.process('data2');

		test.done();
	}
};
