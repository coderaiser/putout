import {operator} from 'putout';

const {ignore, __json} = operator;

export const {
    report,
    fix,
    traverse,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    property: 'exclude',
    list: [
        '**/*.config.*',
    ],
});
