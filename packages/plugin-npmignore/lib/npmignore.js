import {operator} from 'putout';

const {ignore} = operator;

export const {
    fix,
    traverse,
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
