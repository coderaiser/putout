'use strict';

const {
    operate,
    template,
} = require('putout');

const {replaceWith} = operate;

const astRequire = template.ast(`
    require('putout').types
`);

module.exports.report = () => {
    return `"putout.types" should be used instead of "@babel/types"`;
};

function isRequire(path) {
    return path
        .get('callee')
        .isIdentifier({name: 'require'});
}

function isBabelTypes(path) {
    return path
        .get('arguments.0')
        .isStringLiteral({value: '@babel/types'});
}

module.exports.traverse = ({push}) => {
    return {
        CallExpression(path) {
            if (!isRequire(path))
                return;
            
            if (!isBabelTypes(path))
                return;
            
            push(path);
        },
    };
};

module.exports.fix = (path) => {
    replaceWith(path, astRequire);
};

