'use strict';

const types = require('./types');
const operator = require('./operator');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.declare = () => ({
    template: `import {template} from 'putout'`,
    createTest: `import {createTest} from '@putout/test'`,
    ...operator,
    ...types,
    getRule: `const getRule = ${getRule.toString()};`,
});
