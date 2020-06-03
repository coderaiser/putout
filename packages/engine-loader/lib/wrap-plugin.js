'use strict';

const {print} = require('@putout/engine-parser');
const getPositions = require('./get-positions-by-diff');
const getModulePath = require('./get-module-path');

const babelTransform = require('./transforms/babel');
const jscodeshiftTransform = require('./transforms/jscodeshift');

const getMessage = (a) => a
    .replace(/@babel\/plugin-|babel-plugin-/, '')
    .replace(/-/g, ' ');

module.exports = (name, namespace) => {
    const message = getMessage(name);
    
    if (/babel/.test(namespace))
        return getPlugin({
            name: getBabelPluginName(name),
            message,
            transform: babelTransform,
        });
    
    if (/jscodeshift/.test(namespace))
        return getPlugin({
            name,
            message,
            transform: jscodeshiftTransform,
        });
    
    return null;
};

const getPlugin = ({name, transform, message}) => {
    return {
        report: () => message,
        fix: () => {},
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
                
                push(path);
            }
        },
    };
};

function getBabelPluginName(name) {
    const namespaced = getModulePath(`@babel/plugin-${name}`);
    
    if (namespaced)
        return namespaced;
    
    return name;
}

