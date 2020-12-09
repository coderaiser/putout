'use strict';

module.exports.report = () => '"result" should be before "expected"';

module.exports.replace = () => ({
    't.equal(expected, result)': 't.equal(result, expected)',
    't.equal(expected, result, __a)': 't.equal(result, expected, __a)',
    't.deepEqual(expected, result)': 't.deepEqual(result, expected)',
    't.deepEqual(expected, result, __a)': 't.deepEqual(result, expected, __a)',
});
