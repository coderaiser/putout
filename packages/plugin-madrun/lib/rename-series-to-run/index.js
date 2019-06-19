'use strict';

const {isIdentifier} = require('putout').types;

module.exports.report = () => `"run" should be called instead of "series"`;

module.exports.traverse = ({push}) => {
    return {
        CallExpression(path) {
            if (!isIdentifier(path.node.callee, {name: 'series'}))
                return;
            
            push(path);
        },
    };
};

module.exports.fix = (path) => {
    path.node.callee.name = 'run';
};

