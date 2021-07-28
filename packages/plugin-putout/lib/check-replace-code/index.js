'use strict';

const putout = require('putout');
const tryCatch = require('try-catch');

const {
    operator,
    types,
} = putout;

const {replaceWith} = require('putout').operator;

const {
    compare,
    extract,
} = operator;

const name = '__putout_plugin_check_replace_code';
const {BlockStatement} = types;

const get = (path) => path[name];
const set = (path) => path[name] = true;

const rmSemi = (a) => {
    const last = a[a.length - 1];
    
    if (last !== ';')
        return a;
    
    return a.slice(0, -1);
};

module.exports.report = ({path, code, error}) => {
    if (error)
        return error.message;
    
    const key = extract(path.node.key);
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
            const key = extract(node.key);
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

function generateCode(rootPath, key) {
    const [transformError, result] = tryCatch(putout, key, {
        fix: true,
        plugins: [
            ['generate', {
                report: () => {},
                include: () => [
                    'Identifier',
                ],
                fix: (path) => {
                    const {name} = path.node;
                    
                    if (/^__[a-z]$/.test(name)) {
                        path.node.name = rootPath.scope.generateUid();
                        return;
                    }
                    
                    if (name === '__body') {
                        replaceWith(path.parentPath, BlockStatement([]));
                    }
                },
            }],
        ],
    });
    
    return [transformError, result?.code];
}

