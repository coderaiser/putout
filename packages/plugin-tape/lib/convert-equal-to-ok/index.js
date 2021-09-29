'use strict';

module.exports.report = () => `Use 't.ok()' instead of 't.equal()' or 't.deepEqual()'`;

module.exports.replace = () => ({
    't.equal(__a, true)': 't.ok(__a)',
    't.equal(__a, true, __b)': 't.ok(__a, __b)',
    
    't.deepEqual(__a, true)': 't.ok(__a)',
    't.deepEqual(__a, true, __b)': 't.ok(__a, __b)',
});

