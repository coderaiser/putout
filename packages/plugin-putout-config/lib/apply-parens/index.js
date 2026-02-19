import {operator} from 'putout';

const {renameProperties} = operator;
const v37 = [
    ['add-missing-parens', 'parens/add-missing'],
];

export const {
    report,
    fix,
    traverse,
} = renameProperties(v37);
