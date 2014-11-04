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

		var task = function (next, data) {

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

		var processor = new Processor(task, 1, 1);

		processor.run('data1');
		processor.run('data2');
	}
};
