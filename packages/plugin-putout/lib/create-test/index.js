'use strict';

const {
    operator,
    types,
} = require('putout');

const {
    StringLiteral,
    ArrayExpression,
    Identifier,
    ObjectProperty,
    ObjectExpression,
} = types;

const {
    replaceWith,
    getProperty,
} = operator;

const selector = 'createTest(__dirname, __object)';

module.exports.report = () => `Apply modifications to 'createTest()' options`;

module.exports.include = () => [
    selector,
];

module.exports.fix = (path, {options}) => {
    const [name, value] = options.add;
    const objectPath = path.get('arguments.1');
    
    if (!getProperty(objectPath, 'plugins'))
        convert(objectPath);
    
    const property = ObjectProperty(Identifier(name), StringLiteral(value));
    objectPath.node.properties.unshift(property);
};

module.exports.filter = (path, {options}) => {
    if (!options.add)
        return false;
    
    const [name] = options.add;
    const objectPath = path.get('arguments.1');
    
    return !getProperty(objectPath, name);
};

function convert(objectPath) {
    const {
        key,
        value,
    } = objectPath.node.properties[0];
    
    replaceWith(objectPath, ObjectExpression([
        ObjectProperty(Identifier('plugins'), ArrayExpression([
            ArrayExpression([
                key,
                value,
            ]),
        ])),
    ]));
}
