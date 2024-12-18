'use strict';

const types = require('@putout/plugin-putout/declare/types');

module.exports.declare = () => ({
    types: `import {types} from '@putout/babel'`,
    ...types,
});
