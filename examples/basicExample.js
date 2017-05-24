'use strict';

/*
 * BASIC EXAMPLE
 */

/* eslint no-console: 0 */

const deepIterate = require(`../deepIterate`);

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
