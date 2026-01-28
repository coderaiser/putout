import {createRenameProperty} from '../rename-property.js';

const v41 = [
    ['remove-useless-arguments', 'arguments'],
    ['remove-useless-arguments/arguments', 'arguments/remove-useless'],
    ['remove-useless-arguments/method', 'arguments/remove-useless-from-method'],
    ['remove-useless-arguments/unused', 'arguments/remove-unused'],
    ['remove-useless-arguments/json-parse', 'apply-json-parse'],
    ['convert-arguments-to-rest', 'arguments/apply-rest'],
    ['convert-expression-to-params', 'arguments/convert-expression-to-arguments'],
];

const versions = [...v41];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty(versions);
