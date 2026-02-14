import {operator} from 'putout';

const {sortIgnore} = operator;

export const {
    fix,
    report,
    traverse,
} = sortIgnore({
    name: '.gitignore',
});
