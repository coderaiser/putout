import {createRenameProperty} from '../rename-property.js';

const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['remove-unused-labels', 'labels/remove-unused'],
    ['convert-label-to-object', 'labels/convert-to-object'],
]);

export {
    report,
    fix,
    traverse,
};
