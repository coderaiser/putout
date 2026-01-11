import {types} from 'putout';

const {isTSTypeAliasDeclaration} = types;

export const category = 'typescript';
export const report = () => 'Add newlines between types in union';

const regExp = /[^\n]\|\s[A-Za-z]/;

export const filter = ({text, node}) => {
    if (!isTSTypeAliasDeclaration(node.parent))
        return false;
    
    if (text.includes('\n'))
        return false;
    
    if (node.types.length <= 3)
        return false;
    
    return regExp.test(text);
};

export const fix = ({text}) => '\n    | ' + text.replace(/\s\|/g, '\n    |');

export const include = () => [
    'TSUnionType',
];
