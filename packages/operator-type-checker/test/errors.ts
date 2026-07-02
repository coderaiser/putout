import {createTypeChecker} from '../lib/type-checker.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'unknown[]'
createTypeChecker(5);

// THROWS Argument of type 'string' is not assignable to parameter of type 'unknown[]'
createTypeChecker('hello');

createTypeChecker([
    '+: -> !Identifier',
]);
