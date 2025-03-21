import {addProperty} from '../add-property.js';

const {
    report,
    fix,
    traverse,
} = addProperty('EndBug/add-and-commit', 'continue-on-error', true);

export {
    report,
    fix,
    traverse,
};
