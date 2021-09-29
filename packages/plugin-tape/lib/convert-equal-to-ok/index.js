'use strict';

module.exports.report = (path) => {
    const arg = path.get('arguments.0');
    return `Use 't.ok(${arg})' instead of '${path}'`;
};

module.exports.replace = () => ({
    't.equal(__a, true)': 't.ok(__a)',
    't.equal(__a, true, __b)': 't.ok(__a, __b)',
    
    't.deepEqual(__a, true)': 't.ok(__a)',
    't.deepEqual(__a, true, __b)': 't.ok(__a, __b)',
});

