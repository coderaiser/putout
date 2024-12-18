'use strict';

const types = require('./types');
const operator = require('./operator');
const {getRule} = require('./get-rule');

module.exports.declare = () => ({
    types: `import {types} from 'putout'`,
    ...types,
    template: `import {template} from 'putout'`,
    createTest: `import {createTest} from '@putout/test'`,
    ...operator,
    getRule: `const getRule = ${getRule.toString()};`,
});
