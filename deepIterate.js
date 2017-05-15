'use strict';

/*
 * DEEP ITERATE
 */

/*
 * Execute the iteration recursively.
 */
function executeDeepIterate (input, path, iteratee, depth = 0, values = [], options = {}) {

	const isArray = Array.isArray(input);
	const isObject = (typeof input === `object` && !isArray);
	const nextDepth = depth + 1;

	// Known issue, only works with arrays as the top level.
	if (depth === 0 && !isArray) { throw new Error(`The input must be an array!`); }

	if (isArray) {
		return input.forEach(item => executeDeepIterate(item, path, iteratee, nextDepth, values.concat(item), options));
	}

	else if (isObject) {
		const pathParts = path.split(`.`);
		const nextKey = pathParts.slice(depth, nextDepth);
		const nextLevelDown = input[nextKey];
		const nextValues = (options && options.includeAllLevels ? values.concat(nextLevelDown) : values);

		return executeDeepIterate(nextLevelDown, path, iteratee, nextDepth, nextValues, options);
	}

	// If the input is a primitive value we are probably iterating over an array of primitives and should execute the
	// iteratee function on all the array values we've accumulated so far.
	return iteratee(...values);

}

/*
 * Iterate over the given multidimensional, passing parameters for only the array levels to the iteratee function.
 */
module.exports = function deepIterate (input, path, iteratee) {
	return executeDeepIterate(input, path, iteratee);
};

/*
 * Iterate over the given multidimensional, passing a parameters for every depth level to the iteratee function.
 */
module.exports.withAllLevels = function withAllLevels (input, path, iteratee) {
	return executeDeepIterate(input, path, iteratee, void (0), void (0), {
		includeAllLevels: true,
	});
};
