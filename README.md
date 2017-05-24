# Deep-Iterate
Iterate through multidimensional arrays and arrays nested in objects e.g. "days.workLog.jobs" where `days` and `jobs` are arrays and `workLog` is a nested object.

## Caution!
Iterating over a multidimensional array is synchronous, can be slow, and will block your application from doing any other processing whilst it's running. Please use sparingly.

## Quick Start
Here's a simple example to get you started:

```javascript
const deepIterate = require(`deep-iterate`);

const jobsPerDay = [{
	dayName: `Monday`,
	someObject: {
		someProp: `abc`,
		jobs: [87392, 12348, 47209, 94872],
	},
}, {
	dayName: `Tuesday`,
	someObject: {
		someProp: `def`,
		jobs: [26348, 59272, 69390],
	},
}, {
	dayName: `Wednesday`,
	someObject: {
		someProp: `ghi`,
		jobs: [18340],
	},
}];

// Iterate over the given path, passing the values from the arrays "jobsPerDay" and "jobs" to the iteratee.
deepIterate(jobsPerDay, `someObject.jobs`, (day, job) => {
	console.log(`${day.dayName}: ${job}`);
});

// Iterate over the given path, passing the values from every level to the iteratee.
deepIterate.withAllLevels(jobsPerDay, `someObject.jobs`, (day, someObject, job) => {
	console.log(`${day.dayName}: (${someObject.someProp}) ${job}`);
});
```

## Important Notes
A few things to take note of:

* The input you pass in must be an array, but it may contain nested arrays, nested objects or nested primitive values to any depth.
* The iteratee function is called for every value in the most deep part of the path, for example with the path `array1.array2`, the iteratee will be called for every element in `array2`.
* Can be used to iterate over a unidimensional array but will incur a performance penalty. You'd be better off calling `.forEach()` on your array.

## API Overview

### deepIterate(input, path, iteratee);
Takes a multidimensional array and a period-delimited path (e.g. `days.workLog.jobs`) to iterate over. The iteratee will be called for every element in the most deeply nested array (e.g. `jobs`) and will be passed parameters for every array it encountered along the path. See the quick start example above or run the example with: `node ./examples/basicExample.js`.

**Iteratee Signature:** iteratee(array1, array2, ...arrayN)

### deepIterate.withAllLevels(input, path, iteratee)
Takes a multidimensional array and a period-delimited path (e.g. `days.workLog.jobs`) to iterate over. The iteratee will be called for every element in the most deeply nested array (e.g. `jobs`) and will be passed parameters for every object OR array it encountered along the path. See the quick start example above or run the example with: `node ./examples/basicExample.js`.

**Iteratee Signature:** iteratee(level1, level2, ...levelN)
