'use strict';

const print = require('../print');
const getPositions = require('../get-positions-by-diff');

const babelTransform = require('./transforms/babel');
const jscodeshiftTransform = require('./transforms/jscodeshift');

const getMessage = (a) => a
    .replace(/@babel\/plugin-|babel-plugin-/, '')
    .replace(/-/g, ' ');

module.exports = (name, namespace) => {
    const message = getMessage(name);
    
    if (/babel/.test(namespace))
        return getPlugin({
            name,
            message,
            transform: babelTransform,
        });
    
    if (/jscodeshift/.test(namespace))
        return getPlugin({
            name,
            message,
            transform: jscodeshiftTransform,
        });
};

const getPlugin = ({name, transform, message}) => {
    return {
        report: () => message,
        fix: ({ast}) => transform(ast, '', name),
        find(ast, {push}) {
            const oldCode = print(ast);
            transform(ast, oldCode, name);
            const newCode = print(ast);
            
            if (newCode === oldCode)
                return;
            
            const positions = getPositions(oldCode, newCode);
            for (const start of positions) {
                const node = {
                    loc: {
                        start,
                    },
                };
                
                const path = {
                    node,
                };
                
                push({
                    path,
                    ast,
                });
            }
        },
    };
};

