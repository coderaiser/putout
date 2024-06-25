'use strict';

const {
    operator,
    parse,
    print,
    transform,
} = require('putout');

const tryCatch = require('try-catch');
const generateCode = require('./generate-code');
const noop = () => {};

const {
    compare,
    extract,
    compute,
    __json,
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

module.exports.traverse = ({push, options}) => {
    const {once = true} = options;
    
    return {
        'module.exports.replace = () => __a': createTraverseReplacer({
            once,
            push,
        }),
        'export const replace = () => __a': createTraverseReplacer({
            once,
            push,
        }),
    };
};

function getProperties(path) {
    const props = `body.properties`;
    
    if (path.isExportNamedDeclaration())
        return path.get(`declaration.declarations.0.init.${props}`);
    
    return path.get(`right.${props}`);
}

const createTraverseReplacer = ({once, push}) => (path) => {
    if (once && get(path))
        return;
    
    if (hasMatch(path))
        return;
    
    for (const propertyPath of getProperties(path)) {
        const template = extractValue(propertyPath);
        
        if (!template)
            continue;
        
        const [parseError, key] = parseKey(propertyPath);
        
        if (parseError) {
            push({
                error: parseError,
                mainPath: path,
                path: propertyPath,
            });
            
            return;
        }
        
        const [generateError, keyCode] = generateCode(path, key);
        
        if (generateError) {
            push({
                error: generateError,
                mainPath: path,
                path: propertyPath,
            });
            
            return;
        }
        
        const ast = parse(keyCode, {
            isTS: true,
        });
        
        const [transformError] = tryCatch(transform, ast, keyCode, {
            plugins: [
                ['evaluate', {
                    report: noop,
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
        
        const code = print(ast).slice(0, -1);
        const [error, is] = tryCatch(compare, rmSemi(code), template);
        
        if (error || !is)
            push({
                code,
                mainPath: path,
                path: propertyPath,
            });
    }
};

function parseKey(propertyPath) {
    const keyPath = propertyPath.get('key');
    
    if (keyPath.isIdentifier({name: '__json'}))
        return [null, __json];
    
    const [isComputed, key] = compute(keyPath);
    
    if (!isComputed)
        return [
            Error(`Replace key cannot be computed: '${keyPath.toString()}'`),
        ];
    
    return [null, key];
}

function hasMatch(path) {
    const {body} = path.scope.getProgramParent().path.node;
    
    for (const current of body) {
        if (compare(current, 'module.exports.match = __a'))
            return true;
    }
    
    return false;
}

function extractValue(path) {
    const valuePath = path.get('value');
    
    if (valuePath.isIdentifier({name: '__json'}))
        return __json;
    
    if (valuePath.isStringLiteral())
        return valuePath.node.value;
    
    return null;
}
