'use strict';

const eslintFlat = require('./eslint-flat');

module.exports.declare = () => ({
    ...eslintFlat,
    safeAlign: {
        esm: `import {safeAlign} from 'eslint-plugin-putout/config'`,
        commonjs: `const {safeAlign} = require('eslint-plugin-putout/config')`,
    },
});
