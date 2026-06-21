import {operator} from '../lib/index.js';

const {
    replaceWith,
    compare,
    traverse,
    toJS,
    hasTagName,
} = operator;

// THROWS Expected 2 arguments, but got 1.
replaceWith(1);
// THROWS Expected 2-4 arguments, but got 1.
compare('hello');
// THROWS Expected 2 arguments, but got 1.
traverse(1);
// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
toJS(5);
// THROWS Expected 2 arguments, but got 1
hasTagName(5);
