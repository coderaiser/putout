import {
    isSimple,
    extract,
    compute,
    remove,
    getExportDefault,
    getLiteralRaw,
    isModuleExports,
    insertBefore,
    insertAfter,
    isESM,
    setLiteralValue,
    getBinding,
    getBindingPath,
    rename,
    renameProperty,
    getPathAfterRequires,
    findBinding,
    getPathAfterImports,
    traverseProperties,
    getProperties,
    getProperty,
    toExpression,
    replaceWithMultiple,
    replaceWith,
} from '../lib/operate.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
isSimple(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node | NodePath_Final'
extract(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
compute(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
remove(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getExportDefault(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getLiteralRaw(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
isModuleExports(5);

// THROWS Expected 2 arguments, but got 1
insertBefore(5);

// THROWS Expected 2 arguments, but got 1
insertAfter(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
isESM(5);

// THROWS Expected 2 arguments, but got 1
setLiteralValue(5);

// THROWS Expected 2 arguments, but got 1
getBinding(5);

// THROWS Expected 2 arguments, but got 1
getBindingPath(5);

// THROWS Expected 3 arguments, but got 1
rename(5);

// THROWS Expected 3 arguments, but got 1
renameProperty(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final[]'
getPathAfterRequires(5);

// THROWS Expected 2 arguments, but got 1
findBinding(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final[]'
getPathAfterImports(5);

// THROWS Expected 2-3 arguments, but got 1
traverseProperties(5);

// THROWS Expected 2 arguments, but got 1
getProperties(5);

// THROWS Expected 2 arguments, but got 1
getProperty(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'Node'
toExpression(5);

// THROWS Expected 2 arguments, but got 1
replaceWithMultiple(5);

// THROWS Expected 2 arguments, but got 1
replaceWith(5);
