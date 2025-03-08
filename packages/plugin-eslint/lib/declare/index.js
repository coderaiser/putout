'use strict';

const eslintFlat = require('./eslint-flat');
const configHelpers = require('./config-helpers');

module.exports.declare = () => ({
    ...eslintFlat,
    ...configHelpers,
    safeAlign: `import {safeAlign} from 'eslint-plugin-putout'`,
});
