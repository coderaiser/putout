import {createRenameProperty} from '../rename-property.js';

const v29 = [
    ['declare-undefined-variables', 'declare'],
    ['apply-array-at', 'array-at'],
    ['apply-maybe', 'maybe'],
];

const v26 = [
    ['strict-mode/add', 'strict-mode/add-missing'],
    ['strict-mode/remove', 'strict-mode/remove-useless'],
];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ...v29,
    ...v26,
]);
