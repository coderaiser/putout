import {operator} from 'putout';

const {removeFiles} = operator;

export const {
    report,
    fix,
    scan,
} = removeFiles([
    '*.swp',
    '*.swo',
    '.nyc_output',
    '.travis.yml',
    '.DS_Store',
]);
