import {
    compare,
    traverse,
    toJS,
    hasTagName,
    ignore,
    addArgs,
    remove,
} from '../lib/operator.js';

// THROWS Expected 2-4 arguments, but got 1
compare('hello');
// THROWS Expected 2 arguments, but got 1
traverse(5);
// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
toJS(5);
// THROWS Expected 2 arguments, but got 1
hasTagName(5);
// THROWS Argument of type 'number' is not assignable to parameter of type 'IgnoreOptions'
ignore(5);
// THROWS Argument of type 'number' is not assignable to parameter of type 'AddArgsOptions'
addArgs(5);
// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
remove(5);
