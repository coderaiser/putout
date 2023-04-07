'use strict';

module.exports.report = (path) => {
    const arg = path.get('arguments.0');
    return `Use 't.calledOnce(${arg.get('object')})' instead of '${path}'`;
};

module.exports.replace = () => ({
    't.equal(__a.callCount, 1)': 't.calledOnce(__a)',
    't.equal(__a.callCount, 1, __b)': 't.calledOnce(__a, __b)',
});
