import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['convert-math-pow', 'math/apply-exponential'],
    ['apply-numeric-separators', 'math/apply-numeric-separators'],
    ['convert-imul-to-multiplication', 'math/apply-multiplication'],
    ['convert-sqrt-to-hypot', 'math/convert-sqrt-to-hypot'],
]);
