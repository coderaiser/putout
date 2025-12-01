import {createRenameProperty} from '../rename-property.js';

const v41 = [
    ['remove-useless-spread', 'spread'],
    ['remove-useless-spread/nested', 'spread/simplify-nested'],
    ['remove-useless-spread/array', 'spread/remove-useless-array'],
    ['remove-useless-spread/object', 'spread/remove-useless-object'],
];

const versions = [
    ...v41,
];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty(versions);
