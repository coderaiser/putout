import {operator} from 'putout';

const {__json, sortIgnore} = operator;

export const {
    report,
    fix,
    traverse,
} = sortIgnore({
    type: __json,
    name: '.putout.json',
    property: 'ignore',
});
