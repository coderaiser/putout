import {operator} from 'putout';

const {ignore} = operator;

export const {
    match,
    replace,
    report,
} = ignore({
    name: '.npmignore',
    list: [
        '.*',
        '*.log',
        'coverage',
        '*.config.*',
        '*.loc',
    ],
});
