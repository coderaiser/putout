import {operator} from 'putout';

const {isConditionKeyword} = operator;
const {isModuleDeclarationKeyword} = operator;
const {isDeclarationKeyword} = operator;
const {isKeyword} = operator;

isKeyword('if');
isDeclarationKeyword('let');
isModuleDeclarationKeyword('import');
isConditionKeyword('if');
