import {createRenameProperty} from '../rename-property.js';

const {
    report,
    fix,
    traverse,
} = createRenameProperty([
    ['remove-useless-variables/await', 'promises/remove-useless-variables'],
]);

export {
    report,
    fix,
    traverse,
};
