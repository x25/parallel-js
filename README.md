parallel-js [![](https://travis-ci.org/x25/parallel-js.png)](https://travis-ci.org/x25/parallel-js) [![](https://coveralls.io/repos/x25/parallel-js/badge.png)](https://coveralls.io/r/x25/parallel-js)
===========

Run functions and processes in parallel or one after another.

```bash
$ npm install parallel-js
```

## Usage

Example: resizing huge images in parallel using ImageMagick and child process.

```js
var Processor = require('parallel-js').Processor;

var task = function (next, command, args) {

	var child = require('child_process').spawn(command, args);

	child.on('close', function (code) {

		console.log(new Date(), command, args, 'finished with code', code);

		next(code);
	});
};

var maxProcess = 2;
var numRetries = 1;

var parallel = new Processor(task, maxProcess, numRetries);

//These tasks are processed in parallel (maxProcess=2)
parallel.run('convert', ['1.jpg', '-resize', '50%', '1.png']);
parallel.run('convert', ['2.jpg', '-resize', '50%', '2.png']);

//After completing one of the tasks the next task will be launched
parallel.run('convert', ['3.jpg', '-resize', '50%', '3.png']);

// Task ended with an error will be repeated 1 more time (numRetries=1)
parallel.run('convert', ['missing.jpg', '-resize', '50%', 'missing.png']);
```

Output:

```
[17:13:52] "convert 1.jpg -resize 50% 1.png" finished with code 0
[17:13:52] "convert 2.jpg -resize 50% 2.png" finished with code 0
[17:13:53] "convert missing.jpg,-resize 50% missing.png" finished with code 1
[17:13:53] "convert missing.jpg,-resize,50% missing.png" finished with code 1
[17:13:58] "convert 3.jpg -resize 50% 3.png" finished with code 0
```

## Tests

```sh
$ npm test
```

## License

MIT
