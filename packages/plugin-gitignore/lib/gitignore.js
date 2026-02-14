import {operator} from 'putout';

const {ignore} = operator;

export const {
    report,
    fix,
    traverse,
} = ignore({
    name: '.gitignore',
    list: [
        '.idea',
        '*.swp',
        '*.log',
        '*.lock',
        'coverage',
    ],
});
