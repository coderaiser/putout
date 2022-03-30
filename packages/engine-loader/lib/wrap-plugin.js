'use strict';

const tryCatch = require('try-catch');
const {print} = require('@putout/engine-parser');

const getPositions = require('./get-positions-by-diff');

const babelTransform = require('./transforms/babel');

const getMessage = (a) => a
    .replace(/@babel\/plugin-|babel-plugin-/, '')
    .replaceAll('-', ' ');

const getModulePath = (name) => {
    const [, path] = tryCatch(require.resolve, name);
    return path;
};

module.exports = (name, namespace) => {
    const message = getMessage(name);
    
    if (/babel/.test(namespace))
        return getPlugin({
            name: getBabelPluginName(name),
            message,
            transform: babelTransform,
        });
    
    return null;
};

const getPlugin = ({name, transform, message}) => ({
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
});

function getBabelPluginName(name) {
    const namespaced = getModulePath(`@babel/plugin-${name}`);
    
    if (namespaced)
        return namespaced;
    
    return name;
}

