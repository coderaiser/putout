import {
    parse,
    print,
    transform,
} from 'putout';
import {tryCatch} from 'try-catch';
import * as pluginGenerate from './plugin-generate.js';

export default (rootPath, source) => {
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
