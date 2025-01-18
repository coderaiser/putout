'use strict';

const {types} = require('putout');
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
    '(vars, path) => __body': (path) => {
        path.traverse({
            ReferencedIdentifier(refPath) {
                const {node} = refPath;
                const {name} = node;
                
                if (!name.startsWith('__'))
                    return;
                
                if (refPath.scope.bindings[name])
                    return;
                
                push({
                    path,
                    node,
                });
            },
        });
    },
});
