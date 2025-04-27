import {createRenameProperty} from '../rename-property.js';

export const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['remove-useless-variables/await', 'promises/remove-useless-variables'],
]);
