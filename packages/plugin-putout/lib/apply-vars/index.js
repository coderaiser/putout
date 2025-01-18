'use strict';

module.exports.report = () => `Use 'var' instead of '{}'`;

module.exports.replace = () => ({
    '({}, path) => __body': '(vars, path) => __body',
});
