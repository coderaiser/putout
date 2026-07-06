import * as convertSetLocalToLocalSet from './convert-set-local-to-local-set/index.js';
import * as removeUselessArgs from './remove-useless-args/index.js';
import * as removeUnused from './remove-unused/index.js';

export const rules = [
    ['convert-set-local-to-local-set', convertSetLocalToLocalSet],
    ['remove-useless-args', removeUselessArgs],
    ['remove-unused', removeUnused],
];
