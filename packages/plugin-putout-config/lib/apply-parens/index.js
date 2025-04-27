import {createRenameProperty} from '../rename-property.js';

const v37 = [
    ['add-missing-parens', 'parens/add-missing'],
];

export const {
    report,
    fix,
    traverse,
} = createRenameProperty(v37);
