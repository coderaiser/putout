import {operator} from 'putout';

const {ignore, __ignore} = operator;
const {
    match,
    replace,
    report,
} = ignore(__ignore, {
    name: '.npmignore',
    list: [
        '.*',
        'yarn-error.log',
        'coverage',
        '*.config.*',
    ],
});

export {
    match,
    replace,
    report,
};
