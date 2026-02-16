import {operator} from 'putout';

const {removeFiles} = operator;

export const {
    report,
    fix,
    scan,
} = removeFiles();
