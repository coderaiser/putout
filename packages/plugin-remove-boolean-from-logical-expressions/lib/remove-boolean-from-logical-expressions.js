'use strict';

module.exports.report = () => '"true" has no sense in logical expressions';

module.exports.replace = () => ({
    'true && false': 'false',
    'false && true': 'false',
    '__a && true': 'Boolean(__a)',
    'true && __a': '__a',
});

