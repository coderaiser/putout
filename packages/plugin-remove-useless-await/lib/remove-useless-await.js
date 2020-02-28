'use strict';

module.exports.report = () => `Useless await should be avoided`;

module.exports.replace = () => ({
    'await await __a': 'await __a',
});

