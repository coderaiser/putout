import {operator} from '../lib/index.js';

const {
    compare,
    traverse,
    toJS,
    hasTagName,
    replaceWith,
    addArgs,
    declare,
    isKeyword,
    findFile,
    matchFiles,
    findFileUp,
    isSimpleRegExp,
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

// THROWS Expected 2 arguments, but got 1.
replaceWith(1);

// THROWS Argument of type 'number' is not assignable to parameter of type 'AddArgsOptions'
addArgs(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'DeclareOptions'
declare(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'.
findFile(5, 'hello');

// THROWS Expected 1 arguments, but got 2.
matchFiles(5, 'hello');

// THROWS Expected 2 arguments, but got 1
findFileUp(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'RegExp'
isSimpleRegExp(5);

// THROWS Expected 1 arguments, but got 0
isSimpleRegExp();
