parallel-js
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

	var self = this;
	setTimeout(function () {

		var timestamp = new Date().getTime()/1000;
		console.log(timestamp + ' - Video ' + video + ' processed');
		next();

	}, 2000);
};

var maxProcess = 2;

var processor = new Processor(
	job,
	maxProcess
);

processor.process('1.flv');
processor.process('2.flv');
processor.process('3.flv');
processor.process('4.flv');
```

Output:

```
1401030512.418 - Video 1.flv processed
1401030512.418 - Video 2.flv processed
1401030514.443 - Video 3.flv processed
1401030514.443 - Video 4.flv processed
```

## API

###Class: Processor(callback, [maxProcess], [numRetries])

**.process(payload)**

## Tests

```sh
$ npm test
```

## License

MIT
