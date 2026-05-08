import * as applyCamelCase from './apply-camel-case/index.js';
import * as addToExclude from './add-to-exclude/index.js';
import * as sortIgnore from './sort-ignore/index.js';
import * as removeFiles from './remove-files/index.js';

export const rules = {
    'add-to-exclude': addToExclude,
    'sort-ignore': sortIgnore,
    'remove-files': ['off', removeFiles],
    'apply-camel-case': applyCamelCase,
};
