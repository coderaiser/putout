'use strict';

const {operator, template} = require('putout');

const {replaceWith} = operator;

const astRequire = template.ast(`
    require('putout').types
`);

module.exports.report = () => {
    return `"putout.types" should be used instead of "@babel/types"`;
};

const isRequire = (path) => path.get('callee').isIdentifier({
    name: 'require',
});

const isBabelTypes = (path) => path.get('arguments.0').isStringLiteral({
    value: '@babel/types',
});

module.exports.traverse = ({push}) => ({
    CallExpression(path) {
        if (!isRequire(path))
            return;
        
        if (!isBabelTypes(path))
            return;
        
        push(path);
    },
});

module.exports.fix = (path) => {
    replaceWith(path, astRequire);
};
