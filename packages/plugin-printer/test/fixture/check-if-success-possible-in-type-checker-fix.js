import {types} from '@putout/babel';

const {isObjectExpression} = types;
const isSimple = createTypeChecker([
    '-: -> SpreadElement',
    '-: -> Identifier',
    '-: -> !CallExpression',
]);

const isSimpleAfterObject = createTypeChecker([
    ['-:', isSimple],
    ['-:', callWithNext(isObjectExpression)],
    ['-:', callWithPrev(isObjectExpression)],
]);
