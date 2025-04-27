import {createRenameProperty} from '../rename-property.js';

export const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['convert-mock-require-to-mock-import', 'tape/convert-mock-require-to-mock-import'],
]);
