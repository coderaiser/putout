import {
    isKeyword,
    isDeclarationKeyword,
    isModuleDeclarationKeyword,
    isConditionKeyword,
    isStatementKeyword,
    isTSKeyword,
    isLegacyKeyword,
} from '../lib/keyword.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isDeclarationKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isModuleDeclarationKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isConditionKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isStatementKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isTSKeyword(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
isLegacyKeyword(5);
