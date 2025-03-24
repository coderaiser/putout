import {createRenameProperty} from '../rename-property.js';

const v37 = [
    ['convert-optional-to-logical/assign', 'optional-chaining/convert-optional-assign-to-logical'],
    ['convert-optional-to-logical/call', 'optional-chaining/convert-optional-to-logical'],
    ['apply-optional-chaining/assign', 'optional-chaining/convert-logical-assign-to-optional'],
    ['apply-optional-chaining/use', 'optional-chaining/convert-logical-to-optional'],
];

const {
    report,
    fix,
    traverse,
} = createRenameProperty(v37);

export {
    report,
    fix,
    traverse,
};
