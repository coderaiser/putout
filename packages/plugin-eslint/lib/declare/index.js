'use strict';

module.exports.declare = () => ({
    safeAlign: {
        esm: `import {safeAlign} from 'eslint-plugin-putout/config'`,
        commonjs: `const {safeAlign} = require('eslint-plugin-putout/config')`,
    },
});
