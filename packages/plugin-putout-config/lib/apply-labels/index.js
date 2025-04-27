import {createRenameProperty} from '../rename-property.js';

export const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['remove-unused-labels', 'labels/remove-unused'],
    ['convert-label-to-object', 'labels/convert-to-object'],
]);
