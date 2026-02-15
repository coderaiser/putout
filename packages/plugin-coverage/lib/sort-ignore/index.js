import {operator} from 'putout';

const {sortIgnore, __json} = operator;

export const {
    fix,
    report,
    traverse,
} = sortIgnore({
    name: '.nycrc.json',
    type: __json,
    property: 'exclude',
});
