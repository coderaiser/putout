import {createTypeChecker} from '../lib/type-checker.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string[]'
createTypeChecker(5);

// THROWS Argument of type 'string' is not assignable to parameter of type 'string[]'
createTypeChecker('hello');

createTypeChecker([
    '+: -> !Identifier',
]);
