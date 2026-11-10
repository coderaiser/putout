export const beforeIf = createTypeChecker([
    ['+: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
]);

export const x = create([
    ['+ -> !', isInsideArray],
    ['- parentPath ->', isCoupleLines],
]);

const notCall = '- : path';

notTypeChecker('- : path');
