'use strict';

module.exports.report = () => `Useless spread should be avoided`;

module.exports.replace = () => ({
    '({...__a})': '__a',
});
