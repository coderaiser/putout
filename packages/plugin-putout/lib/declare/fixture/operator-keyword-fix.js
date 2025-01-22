import {operator} from 'putout';

const {isConditionKeyword} = operator;
const {isDeclarationKeyword} = operator;
const {isKeyword} = operator;

isKeyword('if');
isDeclarationKeyword('let');
isConditionKeyword('if');
