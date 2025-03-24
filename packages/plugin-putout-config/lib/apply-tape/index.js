import {createRenameProperty} from '../rename-property.js';

const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['convert-mock-require-to-mock-import', 'tape/convert-mock-require-to-mock-import'],
]);

export {
    report,
    fix,
    traverse,
};
