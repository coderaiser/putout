'use strict';

const {types, operator} = require('putout');
const {getBindingPath} = operator;
const {
    ObjectPattern,
    isIdentifier,
    ObjectProperty,
} = types;

const SHORTHAND = true;
const COMPUTED = false;

module.exports.report = ({node}) => {
    const {name} = node;
    return `Declare template variable '${name}'`;
};

module.exports.fix = ({path, node}) => {
    const [first] = path.node.params;
    const property = ObjectProperty(node, node, COMPUTED, SHORTHAND);
    
    if (isIdentifier(first)) {
        path.node.params[0] = ObjectPattern([property]);
        return;
    }
    
    path.node.params[0].properties.push(property);
};

module.exports.traverse = ({push}) => ({
    '(__a, path) => __body': process(push),
    '(__a) => __body': process(push),
});

const process = (push) => (path) => {
    if (!path.parentPath.isObjectProperty())
        return;
    
    path.traverse({
        ReferencedIdentifier(refPath) {
            const {node} = refPath;
            const {name} = node;
            
            if (!name.startsWith('__'))
                return;
            
            if (getBindingPath(refPath, name))
                return;
            
            push({
                path,
                node,
            });
        },
    });
};
