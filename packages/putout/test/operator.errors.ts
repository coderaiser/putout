import {operator} from '../lib/index.js';

const {replaceWith, compare, traverse, superTraverse, contains} = operator;

// THROWS Expected 2 arguments, but got 1.
replaceWith(1);
// THROWS Expected 2-4 arguments, but got 1.
compare('hello');
// THROWS Expected 2 arguments, but got 1.
traverse(1);
// THROWS Expected 2 arguments, but got 1.
superTraverse(1);
// THROWS Expected 2 arguments, but got 1.
contains(1);
