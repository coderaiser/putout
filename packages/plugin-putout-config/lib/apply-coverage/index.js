import {operator} from 'putout';

const {renameProperties} = operator;
const v42 = [
    ['filesystem/remove-nyc-output', 'coverage/remove-files'],
];

export const {
    fix,
    traverse,
    report,
} = renameProperties([...v42]);
