import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['remove-useless-variables/await', 'promises/remove-useless-variables'],
]);
