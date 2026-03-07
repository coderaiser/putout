import {types} from '@putout/babel';

const {isBlockStatement} = types;

export const beforeIf = createTypeChecker([
    ['-: -> !StringLiteral'],
    ['-: -> BlockStatement'],
    ['-: -> WrongType'],
    ['-: ->', isBlockStatement],
    ['-', isBlockStatement],
]);
