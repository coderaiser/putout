'use strict';

const types = require('./types');
const operator = require('./operator');

module.exports = {
    template: `import {template} from 'putout'`,
    createTest: `import {createTest} from '@putout/test'`,
    ...operator,
    ...types,
};

