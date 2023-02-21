'use strict';

const {types} = require('putout');
const {isTSTypeAliasDeclaration} = types;

module.exports.category = 'typescript';
module.exports.report = () => 'Add newlines between types in union';

const regExp = /[^\n]\|\s[A-Za-z]/;

module.exports.filter = ({text, node}) => {
    if (!isTSTypeAliasDeclaration(node.parent))
        return false;
    
    if (text.includes('\n'))
        return false;
    
    if (node.types.length <= 3)
        return false;
    
    return regExp.test(text);
};

module.exports.fix = ({text}) => {
    return text.replace(/\s\|/g, '\n    |');
};

module.exports.include = () => [
    'TSUnionType',
];

