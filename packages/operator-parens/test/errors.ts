import {
    addParens,
    removeParens,
    hasParens,
} from '../lib/parens.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'.
addParens(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'.
removeParens(5);

// THROWS Expected 1-2 arguments, but got 0.
hasParens();
