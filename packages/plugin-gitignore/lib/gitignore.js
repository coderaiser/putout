import {operator} from 'putout';

const {ignore, __ignore} = operator;

export const {
    match,
    replace,
    report,
} = ignore(__ignore, {
    name: '.gitignore',
    list: [
        '.idea',
        '*.swp',
        'yarn-error.log',
        'coverage',
    ],
});
