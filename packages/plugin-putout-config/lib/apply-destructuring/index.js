import {operator} from 'putout';

const {renameProperties} = operator;
const v41 = [
    ['apply-destructuring', 'destructuring'],
    ['apply-destructuring/object', 'destructuring/apply-object'],
    ['apply-destructuring/array', 'destructuring/apply-array'],
    ['apply-destructuring/falsy', 'destructuring/remove-useless-object'],
    ['apply-destructuring/convert-object-to-array', 'destructuring/convert-object-to-array'],
    ['merge-destructuring-properties', 'destructuring/merge-properties'],
    ['split-call-with-destructuring', 'destructuring/split-call'],
    ['split-nested-destructuring', 'destructuring/split-nested'],
    ['remove-useless-arguments/destructuring', 'destructuring/remove-useless-arguments'],
    ['remove-useless-variables/destruct', 'destructuring/remove-useless-variables'],
    ['extract-object-properties', 'destructuring/extract-properties'],
    ['extract-object-properties/equal-deep', 'destructuring/extract-properties-equal-deep'],
    ['extract-object-properties/not-equal-deep', 'destructuring/extract-properties-not-equal-deep'],
];

const versions = [...v41];

export const {
    report,
    fix,
    traverse,
} = renameProperties(versions);
