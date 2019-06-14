'use strict';

const {replaceWith} = require('putout').operate;

const {binaryExpression} = require('putout').types;

module.exports.report = () => 'operator "**" should be used instead of Math.pow';

module.exports.fix = ({path, left, right}) => {
    replaceWith(path, binaryExpression('**', left, right));
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(path) {
            const calleePath = path.get('callee');
            
            if (!calleePath.isMemberExpression())
                return;
            
            const isMath = calleePath
                .get('object')
                .isIdentifier({name: 'Math'});
            
            const isPow = calleePath
                .get('property')
                .isIdentifier({name: 'pow'});
            
            if (!isMath || !isPow)
                return;
            
            const [left, right] = path.node.arguments;
            push({
                path,
                left,
                right,
            });
        },
    });
};

