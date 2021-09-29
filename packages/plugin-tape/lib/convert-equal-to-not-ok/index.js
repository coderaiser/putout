'use strict';

module.exports.report = (path) => {
    const arg = path.get('arguments.0');
    return `Use 't.notOk(${arg})' instead of '${path}'`;
};

module.exports.replace = () => ({
    't.equal(__a, null)': 't.notOk(__a)',
    't.equal(__a, null, __b)': 't.notOk(__a, __b)',
    't.equal(__a, false)': 't.notOk(__a)',
    't.equal(__a, false, __b)': 't.notOk(__a, __b)',
    't.equal(__a, undefined)': 't.notOk(__a)',
    't.equal(__a, undefined, __b)': 't.notOk(__a, __b)',
    
    't.deepEqual(__a, null)': 't.notOk(__a)',
    't.deepEqual(__a, null, __b)': 't.notOk(__a, __b)',
    't.deepEqual(__a, undefined)': 't.notOk(__a)',
    't.deepEqual(__a, undefined, __b)': 't.notOk(__a, __b)',
    't.deepEqual(__a, false)': 't.notOk(__a)',
    't.deepEqual(__a, false, __b)': 't.notOk(__a, __b)',
});

