import {createRenameProperty} from '../rename-property.js';

const v41 = [
    ['apply-destructuring', 'destructuring'],
    ['apply-destructuring/object', 'destructuring/apply-object'],
    ['apply-destructuring/array', 'destructuring/apply-array'],
    ['apply-destructuring/falsy', 'destructuring/remove-useless-object'],
    ['merge-destructuring-properties', 'destructuring/merge-properties'],
    ['split-call-with-destructuring', 'destructuring/split-call'],
    ['split-nested-destructuring', 'destructuring/split-nested'],
    ['remove-useless-arguments/destructuring', 'destructuring/remove-useless-arguments'],
];

const versions = [...v41];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty(versions);
