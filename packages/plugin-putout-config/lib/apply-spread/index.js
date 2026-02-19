import {operator} from 'putout';

const {renameProperties} = operator;
const v41 = [
    ['remove-useless-spread', 'spread'],
    ['remove-useless-spread/nested', 'spread/simplify-nested'],
    ['remove-useless-spread/array', 'spread/remove-useless-array'],
    ['remove-useless-spread/object', 'spread/remove-useless-object'],
    ['convert-apply-to-spread', 'spread/convert-apply-to-spread'],
    ['convert-object-assign-to-merge-spread', 'spread/convert-object-assign-to-merge-spread'],
];

const versions = [...v41];

export const {
    report,
    fix,
    traverse,
} = renameProperties(versions);
