import {operator} from '../lib/index.js';

const {replaceWith, compare} = operator;

// THROWS Expected 2 arguments, but got 1.
replaceWith(1);
// THROWS Expected 2-4 arguments, but got 1.
compare('hello');
