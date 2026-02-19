import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['remove-unused-labels', 'labels/remove-unused'],
    ['convert-label-to-object', 'labels/convert-to-object'],
]);
