'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = () => `First "run" argument should be string, if it is single`;

module.exports.fix = ({path, element}) => {
    replaceWith(path, element);
};

module.exports.traverse = ({push}) => {
    return {
        CallExpression(path) {
            if (!path.get('callee').isIdentifier({name: 'run'}))
                return;
            
            const argPath = path.get('arguments.0');
            
            if (!argPath.isArrayExpression())
                return;
            
            const [arg] = path.node.arguments;
            
            if (arg.elements.length !== 1)
                return;
            
            const [element] = arg.elements;
            push({
                element,
                path: argPath,
            });
        },
    };
};

