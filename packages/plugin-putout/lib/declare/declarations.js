'use strict';

const types = require('./types');

module.exports = {
    compare: `const {compare} = operator`,
    contains: `const {contains} = operator`,
    traverse: `const {traverse} = operator`,
    operator: `import {operator} from 'putout'`,
    ...types,
    types: `import {types} from 'putout'`,
};

