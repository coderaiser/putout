import {operator} from 'putout';

const {hasParens} = operator;
const {addParens} = operator;
const {removeParens} = operator;

removeParens(path);
addParens(path);

if (!hasParens(path))
    return;
