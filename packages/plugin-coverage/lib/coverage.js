import {operator} from 'putout';

const {ignore, __json} = operator;

export const {
    match,
    replace,
    report,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    property: 'exclude',
    list: [
        '**/*.config.*',
    ],
});
