import {operator} from 'putout';

const {renameProperties} = operator;
const v37 = [
    ['convert-optional-to-logical/assign', 'optional-chaining/convert-optional-assign-to-logical'],
    ['convert-optional-to-logical/call', 'optional-chaining/convert-optional-to-logical'],
    ['apply-optional-chaining/assign', 'optional-chaining/convert-logical-assign-to-optional'],
    ['apply-optional-chaining/use', 'optional-chaining/convert-logical-to-optional'],
];

export const {
    report,
    fix,
    traverse,
} = renameProperties(v37);
