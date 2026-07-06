import * as removeUselessArgs from './remove-useless-args/index.js';
import * as removeUnused from './remove-unused/index.js';

export const rules = [
    ['remove-useless-args', removeUselessArgs],
    ['remove-unused', removeUnused],
];
