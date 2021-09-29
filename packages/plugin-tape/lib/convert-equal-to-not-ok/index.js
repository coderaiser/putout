'use strict';

module.exports.report = () => `Use 't.notOk()' instead of 't.equal()' or 't.deepEqual()'`;

module.exports.replace = () => ({
    't.equal(__a, null)': 't.notOk(__a)',
    't.equal(__a, null, __b)': 't.notOk(__a, __b)',
    't.equal(__a, false)': 't.notOk(__a)',
    't.equal(__a, false, __b)': 't.notOk(__a, __b)',
    
    't.deepEqual(__a, null)': 't.notOk(__a)',
    't.deepEqual(__a, null, __b)': 't.notOk(__a, __b)',
    't.deepEqual(__a, false)': 't.notOk(__a)',
    't.deepEqual(__a, false, __b)': 't.notOk(__a, __b)',
});

