'use strict';

const {
    parse,
    print,
    transform,
} = require('putout');

const tryCatch = require('try-catch');
const pluginGenerate = require('./plugin-generate');

module.exports = (rootPath, source) => {
    const [parseError, ast] = tryCatch(parse, source, {
        isTS: true,
    });
    
    if (parseError)
        return [parseError];
    
    const getVar = createVarStore(rootPath);
    
    transform(ast, source, {
        rules: {
            generate: ['on', {
                getVar,
            }],
        },
        plugins: [
            ['generate', pluginGenerate],
        ],
    });
    
    const code = print(ast);
    
    return [null, code];
};

function createVarStore(path) {
    const store = {};
    
    return (name) => {
        if (store[name])
            return store[name];
        
        store[name] = path.scope.generateUid();
        
        return store[name];
    };
}
