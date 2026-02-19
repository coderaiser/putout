import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['convert-mock-require-to-mock-import', 'tape/convert-mock-require-to-mock-import'],
]);
