var Processor = require('./../lib').Processor;

var job = function (video, next) {
	// do something with video...
	// and when it's done, execute callback for next job

	setTimeout(function () {

		var timestamp = new Date().getTime()/1000;
		console.log(timestamp + ' - Video ' + video + ' processed');
		next();

	}, 2000);
};

var maxProcess = 3;

var processor = new Processor(job, maxProcess);

for (var i = 1; i<=9; i++) {
	processor.process(i + '.flv');
}
