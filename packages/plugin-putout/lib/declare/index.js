import operator from './operator/index.js';
import {getRule} from './get-rule.js';
import types from './types.js';

export const declare = () => ({
    types: `import {types} from 'putout'`,
    ...types,
    template: `import {template} from 'putout'`,
    createTest: `import {createTest} from '@putout/test'`,
    ...operator,
    getRule: `const getRule = ${getRule.toString()};`,
});
