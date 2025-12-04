import {createRenameProperty} from '../rename-property.js';

const v41 = [
    ['remove-useless-variables', 'variables'],
    ['remove-useless-variables/remove', 'variables/remove-useless'],
    ['remove-useless-variables/assignment', 'variables/remove-useless-assignment'],
    ['remove-useless-variables/rename', 'variables/rename-useless-rename'],
    ['remove-useless-variables/duplicate', 'variables/remove-useless-duplicate'],
    ['remove-useless-variables/declaration', 'variables/remove-useless-declarations'],
    ['remove-unreferenced-variables', 'variables/remove-unreferenced'],
    ['convert-const-to-let', 'variables/convert-const-to-let'],
    ['extract-keyword-from-variables', 'variables/extract-keywords'],
    ['split-variable-declarations', 'variables/split-declarations'],
    ['remove-unused-variables', 'variables/remove-unused'],
];

const versions = [...v41];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty(versions);
