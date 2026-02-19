import {operator} from 'putout';

const {renameProperties} = operator;
const v39 = [
    ['split-assignment-expressions', 'assignment/split'],
    ['simplify-assignments', 'assignment/simplify'],
    ['convert-assignment-to-arrow-function', 'assignment/convert-to-arrow-function'],
    ['convert-assignment-to-comparison', 'assignment/convert-to-comparison'],
    ['convert-assignment-to-declaration', 'assignment/convert-to-declaration'],
];

export const {
    report,
    fix,
    traverse,
} = renameProperties(v39);
