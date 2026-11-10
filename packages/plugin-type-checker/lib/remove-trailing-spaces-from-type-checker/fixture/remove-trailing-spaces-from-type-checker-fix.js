export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
    isIdentifierAndIdentifier,
    isStringAndIdentifierInsideOneElementArray,
]);

const notCall = '- : path';

notTypeChecker('- : path');
