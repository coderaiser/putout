'use strict';

const putout = require('putout');
const tryCatch = require('try-catch');

const generateCode = require('./generate-code');

const {operator} = putout;

const {
    compare,
    extract,
    compute,
} = operator;

const name = '__putout_plugin_check_replace_code';

const get = (path) => path[name];
const set = (path) => path[name] = true;

const rmSemi = (a) => {
    a = a.replace(';;', ';');
    a = a.replace(/;$/, '');
    
    return a;
};

module.exports.report = ({path, code, error}) => {
    if (error)
        return error.message;
    
    const [, key] = parseKey(path);
    const value = extract(path.node.value);
    
    return `transform mismatch: "${key}" -> "${value}" !== "${code}"`;
};

module.exports.fix = ({mainPath}) => {
    set(mainPath);
};

module.exports.traverse = ({push}) => ({
    'module.exports.replace = () => __a': (path) => {
        if (get(path))
            return;
        
        for (const propertyPath of path.get('right.body.properties')) {
            if (!propertyPath.get('value').isStringLiteral())
                continue;
            
            const {node} = propertyPath;
            const [parseError, key] = parseKey(propertyPath);
            
            if (parseError) {
                push({
                    error: parseError,
                    mainPath: path,
                    path: propertyPath,
                });
                return;
            }
            
            const template = extract(node.value);
            const [generateError, keyCode] = generateCode(path, key);
            
            if (generateError) {
                push({
                    error: generateError,
                    mainPath: path,
                    path: propertyPath,
                });
                return;
            }
            
            const [transformError, result] = tryCatch(putout, keyCode, {
                fix: true,
                isTS: true,
                plugins: [
                    ['evaluate', {
                        report: () => {},
                        replace: () => ({
                            [key]: template,
                        }),
                    }],
                ],
            });
            
            if (transformError) {
                push({
                    error: transformError,
                    mainPath: path,
                    path: propertyPath,
                });
                return;
            }
            
            const {code} = result;
            const [error, is] = tryCatch(compare, rmSemi(code), template);
            
            if (error || !is)
                push({
                    code,
                    mainPath: path,
                    path: propertyPath,
                });
        }
    },
});

function parseKey(propertyPath) {
    const keyPath = propertyPath.get('key');
    const [isComputed, key] = compute(keyPath);
    
    if (!isComputed)
        return [Error(`Replace key cannot be computed: '${keyPath.toString()}'`)];
    
    return [null, key];
}

