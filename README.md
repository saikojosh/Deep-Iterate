# Deep-Iterate
Iterate through multidimensional arrays and arrays nested in objects e.g. "days.data.jobs[0]".

## Quick Start

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
deepIterate(jobsPerDay, `jobsPerDay.someObject.jobs`, (day, job) => {
	console.log(`${day.dayName}: ${job}`);
});

// Iterate over the given path, passing the values from every level to the iteratee.
deepIterate.withAllLevels(jobsPerDay, `jobsPerDay.someObject.jobs`, (day, someObject, job) => {
	console.log(`${day.dayName}: (${someObject.someProp}) ${job}`);
});
```

## API Overview

### deepIterate(input, path, iteratee);
Iterate over a multidimensional array, passing only the values from the arrays to the iteratee. See the quick start example above.

**Iteratee Signature:** iteratee(array1, array2, ...arrayN)

### deepIterate.withAllLevels(input, path, iteratee)
Iterate over a multidimensional array, passing the values from all levels to the iteratee. See the quick start example above.

**Iteratee Signature:** iteratee(level1, level2, ...levelN)

## Known Issues
* You cannot provide an object as the input for deepIterate. The input must be an array.
