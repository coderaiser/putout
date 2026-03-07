import {types} from '@putout/babel';

const {isExpressionStatement} = types;
const {isBlockStatement} = types;

export const beforeIf = createTypeChecker([
    ['-: -> !StringLiteral'],
    ['-: -> BlockStatement'],
    ['-: -> WrongType'],
    ['-: ->', isBlockStatement],
    ['-', isBlockStatement],
]);

export const allTuples = createTypeChecker([
    ['-: ->', isBlockStatement],
    ['-', isBlockStatement],
]);

export const allStrings = createTypeChecker([
    '-: -> BlockStatement',
    '-: -> WrongType',
]);

export const allIdentifiers = createTypeChecker([
    isExpressionStatement,
]);
