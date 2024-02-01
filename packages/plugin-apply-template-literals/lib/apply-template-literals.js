'use strict';

const {types} = require('putout');
const {
    isBinaryExpression,
    isTemplateLiteral,
} = types;

module.exports.report = () => `Use template literals instead of binary expressions`;

module.exports.filter = ({parentPath}) => {
    if (isBinaryExpression(parentPath) || isTemplateLiteral(parentPath.parentPath))
        return false;
    
    let is = true;
    
    parentPath.traverse({
        StringLiteral(path) {
            if (path.node.value.includes('\r'))
                is = false;
        },
    });
    
    return is;
};

module.exports.replace = () => ({
    '"__a" + __identifier__b + "__c"': '`__a${__identifier__b}__c`',
    '"__a" + __b(__args)+ "__c"': '`__a${__b(__args)}__c`',
    '__identifier__a + "__b" + __identifier__c + __identifier__d': '`${__identifier__a}__b${__identifier__c}${__identifier__d}`',
    '__identifier__a + "__b"': '`${__identifier__a}__b`',
    '"__a" + __identifier__b': '`__a${__identifier__b}`',
    'String(__a) + ".tar.gz"': '`${__a}.tar.gz`',
});
