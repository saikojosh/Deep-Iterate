'use strict';

/*
 * DEEP ITERATE
 */

/*
 * Execute the iteration recursively.
 */
function executeDeepIterate (input, path, iteratee, depth = 0, values = [], options = {}) {
	/* eslint no-param-reassign: 0 */

	const isArray = Array.isArray(input);
	const isObject = (typeof input === `object` && !isArray);
	const nextDepth = depth + 1;
	const pathParts = path.split(`.`);
	const nextKey = pathParts.slice(depth, nextDepth)[0];
	const maxDepth = pathParts.length + 1;
	const isMaxDepth = (depth === maxDepth);

	// Known issue, only works with arrays as the top level.
	if (depth === -1 && !isArray) { throw new Error(`The input must be an array!`); }

	// For arrays, recurse into every element without increasing the depth.
	if (!isMaxDepth && isArray) {
		return input.forEach(item => executeDeepIterate(item, path, iteratee, depth, values.concat(item), options));
	}

	// For objects, recurse into the next key, or if there are no deeper keys in the path just increase the depth.
	else if (!isMaxDepth && isObject) {
		let nextLevelDown;

		if (typeof nextKey !== `undefined`) {
			nextLevelDown = input[nextKey];
		}
		else {
			nextLevelDown = input;
		}

		const nextValues = (options && options.includeAllLevels ? values.concat(nextLevelDown) : values);
		return executeDeepIterate(nextLevelDown, path, iteratee, nextDepth, nextValues, options);
	}

	// If we're at the deepest part of the path OR we have a primitive value lets call the iteratee with all the values.
	else if (isMaxDepth || (!isArray && !isObject)) {
		values = values.concat(input);
		return iteratee(...values);
	}

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
