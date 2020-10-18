'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    ArrayExpression,
    NumericLiteral,
    ObjectProperty,
    ObjectExpression,
    Identifier,
    StringLiteral,
    isStringLiteral,
    isIdentifier,
} = types;

module.exports.report = () => `"use" should be used instead of query in loaders`;

module.exports.fix = (path) => {
    const {node} = path;
    
    node.key.name = 'use';
    
    const valuePath = path.get('value');
    const [name, options] = valuePath.node.value.split('?');
    const object = buildObject(name, options);
    
    replaceWith(valuePath, ArrayExpression([object]));
};

module.exports.traverse = ({push}) => {
    return {
        ObjectExpression(path) {
            const properties = path.get('properties');
            for (const propPath of properties) {
                const {node} = propPath;
                const {key, value} = node;
                const isLoader = isIdentifier(key, {name: 'loader'});
                const isQuery = isStringLiteral(value) && value.value.includes('?');
                
                if (isLoader && isQuery)
                    push(propPath);
            }
        },
    };
};

function buildObject(name, options) {
    const [key, value] = options.split('=');
    
    const loaderProp = ObjectProperty(Identifier('loader'), StringLiteral(name));
    const optionsProp = ObjectProperty(Identifier('options'), ObjectExpression([
        ObjectProperty(Identifier(key), NumericLiteral(Number(value))),
    ]));
    
    const object = ObjectExpression([
        loaderProp,
        optionsProp,
    ]);
    
    return object;
}
