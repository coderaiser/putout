import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['apply-early-return', 'return/apply-early'],
    ['remove-useless-return', 'return/remove-useless'],
    ['simplify-boolean-return', 'return/simplify-boolean'],
    ['convert-break-to-return', 'return/convert-from-break'],
]);
