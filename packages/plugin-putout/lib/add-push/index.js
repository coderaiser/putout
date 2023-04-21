'use strict';

const {
    types,
    operator,
} = require('putout');

const {traverse} = operator;

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

module.exports.report = () => `Add 'push' argument to 'traverse'`;

module.exports.fix = (path) => {
    const computed = false;
    const shorthand = true;
    const name = Identifier('push');
    
    path.node.right.params.push(ObjectPattern([
        ObjectProperty(name, name, computed, shorthand),
    ]));
};

module.exports.traverse = ({push}) => ({
    'module.exports.traverse = (__args) => __': (traversePath) => {
        const paramsPaths = traversePath.get('right.params');
        
        if (paramsPaths.length)
            return;
        
        traverse(traversePath, {
            'push(__)': () => {
                push(traversePath);
            },
        });
    },
});
