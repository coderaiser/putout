import {
    compare,
    compareAll,
    compareAny,
    getTemplateValues,
    setValues,
    getValues,
    findVarsWays,
    parseTemplate,
    isTemplate,
} from '../lib/compare.js';

// THROWS Expected 2-4 arguments, but got 1.
compare(5);

// THROWS Expected 2-3 arguments, but got 1.
compareAny(5);

// THROWS Expected 2-3 arguments, but got 1.
compareAll(5);

// THROWS Expected 2 arguments, but got 1.
getTemplateValues(5);

// THROWS Argument of type 'number' is not assignable to parameter of type '{ waysTo: Record<string, string[]>; values: Record<string, Node>; path: NodePath_Final; }'.
setValues(5);

// THROWS Argument of type 'number' is not assignable to parameter of type '{ waysFrom: Record<string, string[]>; node: Node; }'
getValues(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
findVarsWays(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parseTemplate(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isTemplate(5);
