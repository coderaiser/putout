'use strict';

module.exports.report = () => '"true" has no sense in logical expressions';

module.exports.replace = () => ({
    '__a && true': '__a',
    'true && __a' : '__a',
});

