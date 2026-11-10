export const beforeIf = createTypeChecker([
    ['- : -> !', isInsideArray],
]);

const notCall = '- : path';

notTypeChecker('- : path');
