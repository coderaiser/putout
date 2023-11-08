'use strict';

module.exports.report = () => `Use 'module.exports' instead of 'exports'`;

module.exports.replace = () => ({
    'exports.__a': 'module.exports.__a',
});
