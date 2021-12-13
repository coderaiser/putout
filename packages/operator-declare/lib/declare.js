'use strict';

const {types, template} = require('putout');
const {isESM} = require('@putout/operate');

const {
    addDeclarationForESLint,
    checkDeclarationForESLint,
    getModuleType,
    setModuleType,
} = require('./record');

const {
    isImportDeclaration,
    isVariableDeclaration,
} = types;

const {keys} = Object;
const isString = (a) => typeof a === 'string';

const crawl = (path) => path.scope.getProgramParent().path.scope.crawl();
const cutName = (a) => a.split('.').shift();
const parseType = (path) => isESM(path) ? 'esm' : 'commonjs';

const isUndefined = (a) => typeof a === 'undefined';

const {stringify} = JSON;

module.exports.declare = (declarations) => ({
    report,
    include,
    fix: fix(declarations),
    filter: filter(declarations),
});

const report = (path) => {
    const {name} = path.node;
    const cutedName = cutName(name);
    
    return `Declare '${cutedName}'`;
};

const include = () => ['ReferencedIdentifier'];

const filter = (declarations) => (path, {options}) => {
    const {dismiss = []} = options;
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const names = keys(allDeclarations);
    const {scope, node} = path;
    const {name} = node;
    
    if (scope.hasBinding(name) || checkDeclarationForESLint(name, path))
        return false;
    
    if (!names.includes(name))
        return false;
    
    if (dismiss.includes(name))
        return false;
    
    return true;
};

const fix = (declarations) => (path, {options}) => {
    const type = getModuleType(path) || setModuleType(parseType(path), path);
    
    const allDeclarations = {
        ...declarations,
        ...options.declarations,
    };
    
    const {name} = path.node;
    const code = parseCode(name, type, allDeclarations[name]);
    
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    const bodyPath = programPath.get('body');
    const node = template.ast.fresh(code);
    
    for (const currentPath of bodyPath) {
        if (isUseStrict(currentPath)) {
            continue;
        }
        
        if (isImportDeclaration(node)) {
            currentPath.insertBefore(node);
            break;
        }
        
        if (currentPath.isVariableDeclaration() && bodyPath.length !== bodyPath.filter(isVariableDeclaration).length) {
            continue;
        }
        
        if (currentPath.isImportDeclaration()) {
            continue;
        }
        
        currentPath.insertBefore(node);
        break;
    }
    
    crawl(path);
    addDeclarationForESLint(name, path);
};

function isUseStrict(path) {
    if (!path.isExpressionStatement())
        return false;
    
    const expressionPath = path.get('expression');
    
    return expressionPath.isStringLiteral({
        value: 'use strict',
    });
}

const parseCode = (name, type, current) => {
    if (isString(current))
        return current;
    
    const result = current[type];
    
    if (isUndefined(result))
        throw Error(`🐊 @putout/operator-declare: code is empty for type '${type}' in declaraiont '${name}' -> ${stringify(current, null, 4)}`);
    
    return result;
};

