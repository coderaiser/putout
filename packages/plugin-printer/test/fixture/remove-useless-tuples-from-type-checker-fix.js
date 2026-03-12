import {types} from '@putout/babel';

const {isExpressionStatement} = types;

export const beforeIf = createTypeChecker([
    '-: -> !StringLiteral',
    '-: -> BlockStatement',
    '-: -> WrongType',
    '-: -> BlockStatement',
    '-: BlockStatement',
]);

export const allTuples = createTypeChecker([
    '-: -> BlockStatement',
    '-: BlockStatement',
]);

export const allStrings = createTypeChecker([
    '-: -> BlockStatement',
    '-: -> WrongType',
]);

export const allIdentifiers = createTypeChecker([
    isExpressionStatement,
]);
