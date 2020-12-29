'use strict';

module.exports.report = () => 'Duplicates should be avoided in logical expressions';

module.exports.replace = () => ({
    '__a && __a': '__a',
    '__a && __b && __a': '__a && __b',
    '__a && __b && __c && __a': '__a && __b && __c',
});

