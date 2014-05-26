parallel-js [![Build Status](https://travis-ci.org/x25/parallel-js.png)](https://travis-ci.org/x25/parallel-js) [![Coverage Status](https://coveralls.io/repos/x25/parallel-js/badge.png)](https://coveralls.io/r/x25/parallel-js)
===========

Run tasks in parallel or one after another.

```bash
$ npm install parallel-js
```

## Usage

```js
var Processor = require('parallel-js').Processor;

var job = function (video, next) {
	// do something with video...
	// and when it's done, execute callback for next job

	setTimeout(function () {
		var now = parseInt(new Date().getTime() / 1000);

		if (video !== '3.flv') {
			console.log(now + ' - ' + video + ' processed');
			next();

		} else {
			//If an error occurs, you can call this job again "numRetries" times
			console.log(now + ' - Error while processing ' + video);
			next('Error!'); //pass any argument
		}

	}, 3000);
};

var maxProcess = 2;
var numRetries = 1;

var processor = new Processor(job, maxProcess, numRetries);

processor.process('1.flv');
processor.process('2.flv');
processor.process('3.flv');
processor.process('4.flv');
processor.process('5.flv');
```

Output:

```
1401033698 - 1.flv processed
1401033698 - 2.flv processed
1401033701 - Error while processing 3.flv
1401033701 - 4.flv processed
1401033704 - Error while processing 3.flv
1401033704 - 5.flv processed
```

## Tests

```sh
$ npm test
```

## License

MIT
