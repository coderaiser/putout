import {createRenameProperty} from '../rename-property.js';

const versions = [
    ['remove-useless-variables', 'variables'],
];

export const {
    report,
    fix,
    traverse,
} = renameProperties(versions);
