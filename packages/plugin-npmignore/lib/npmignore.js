import {operator} from 'putout';

const {ignore, __ignore} = operator;

export const {
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
