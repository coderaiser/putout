import {operator} from 'putout';

const {ignore} = operator;

export const {
    match,
    replace,
    report,
} = ignore({
    name: '.gitignore',
    list: [
        '.idea',
        '*.swp',
        'yarn-error.log',
        'coverage',
    ],
});
