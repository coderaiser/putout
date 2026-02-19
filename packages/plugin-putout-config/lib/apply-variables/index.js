import {operator} from 'putout';

const {renameProperties} = operator;
const v41 = [
    ['remove-useless-variables', 'variables'],
    ['remove-useless-variables/remove', 'variables/remove-useless'],
    ['remove-useless-variables/assignment', 'variables/remove-useless-assignment'],
    ['remove-useless-variables/rename', 'variables/remove-useless-rename'],
    ['remove-useless-variables/duplicate', 'variables/remove-useless-duplicate'],
    ['remove-useless-variables/declaration', 'variables/remove-useless-declarations'],
    ['remove-unreferenced-variables', 'variables/remove-unreferenced'],
    ['convert-const-to-let', 'variables/convert-const-to-let'],
    ['extract-keyword-from-variables', 'variables/extract-keywords'],
    ['split-variable-declarations', 'variables/split-declarations'],
    ['remove-unused-variables', 'variables/remove-unused'],
    ['reuse-duplicate-init', 'variables/reuse-duplicate-init'],
];

const versions = [...v41];

export const {
    report,
    fix,
    traverse,
} = renameProperties(versions);
