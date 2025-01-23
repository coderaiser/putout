'use strict';

const types = require('@putout/plugin-putout/declare/types');

module.exports.declare = () => ({
    createTest: `const {createTest} = require('#test')`,
    test: 'const {test} = createTest(__dirname)',
    fixture: 'const {fixture} = createTest(__dirname)',
    types: `import {types} from '@putout/babel'`,
    ...types,
});
