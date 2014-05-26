var Processor = require('./..').Processor;

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
			setTimeout(function() {
				if (!n) {
					test.equal('data' + (++n), data);
					next('error');
				} else {
					test.equal('data' + (n++), data);
					next();

					if (n === 3) {
						test.done();
					}
				}
			}, 100);
		};

		var maxProcess = 1;
		var processor = new Processor(job, maxProcess);

		processor.process('data1');
		processor.process('data2');
	}
};
