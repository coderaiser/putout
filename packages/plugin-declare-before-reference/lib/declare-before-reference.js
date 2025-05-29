import {types, operator} from 'putout';

const {
    remove,
    compare,
    compareAny,
    insertBefore,
    getPathAfterRequires,
} = operator;

const {
    isFunction,
    isStatement,
    isBlockStatement,
    isProgram,
} = types;

const {entries} = Object;
const isTopScope = (a) => isFunction(a) || isProgram(a);
const getTopUID = (a) => a.find(isTopScope).scope.uid;
const getBlockUID = (a) => a.find(isBlockStatement)?.scope.uid;
const getKey = (a) => a.key;

export const report = ({name}) => {
    return `Declare '${name}' before referencing to avoid 'ReferenceError'`;
};

export const fix = ({path, referencePath}) => {
    const {node} = path.parentPath;
    const programPath = path.scope.getProgramParent().path;
    
    delete node.loc;
    
    remove(path.parentPath);
    
    if (path.scope.uid !== programPath.scope.uid) {
        const topPath = referencePath.find(isStatement);
        
        insertBefore(topPath, node);
    } else {
        const body = programPath.get('body');
        const [first] = body;
        
        if (compare(first, 'const __a = require(__b)')) {
            const latest = getPathAfterRequires(body.slice(1));
            insertBefore(latest, node);
            
            return;
        }
        
        programPath.node.body.unshift(node);
    }
    
    path.__putout_declare_before_reference = true;
};

export const traverse = ({push}) => ({
    'Program|BlockStatement'(path) {
        const {bindings} = path.scope;
        
        for (const [name, value] of entries(bindings)) {
            if (name === 'require')
                continue;
            
            const {referencePaths, path} = value;
            const {uid} = path.scope;
            
            if (path.isFunctionDeclaration())
                continue;
            
            if (path.isClassDeclaration())
                continue;
            
            if (path.__putout_declare_before_reference)
                break;
            
            for (const referencePath of referencePaths) {
                const referenceParentPath = referencePath.parentPath;
                const referenceUid = getTopUID(referencePath);
                const blockUid = getBlockUID(referencePath);
                
                if (uid !== referenceUid && uid !== blockUid)
                    continue;
                
                if (referenceParentPath.isExportDefaultDeclaration())
                    break;
                
                if (referencePath.isExportDeclaration())
                    break;
                
                const initPath = path.get('init');
                
                if (compareAny(getName(initPath), getKeys(referenceParentPath)))
                    break;
                
                if (compareAny(getName(referenceParentPath), getKeys(path)))
                    break;
                
                const [own, pathLoc] = getLoc(path);
                const [referenceOwn, referenceLoc] = getLoc(referencePath);
                
                const declarationLine = pathLoc.start.line;
                const referenceLine = referenceLoc.start.line;
                
                if (own && declarationLine > referenceLine)
                    push({
                        name,
                        path,
                        referencePath,
                    });
                
                if (!own)
                    return;
                
                if (!referenceOwn && declarationLine === referenceLine)
                    push({
                        name,
                        path,
                        referencePath,
                    });
            }
        }
    },
});

function getLoc(path) {
    let {node} = path;
    let loc = {
        start: {},
        end: {},
    };
    
    let own = true;
    
    while (!(loc = node.loc)) {
        path = path.parentPath;
        node = path.node || {};
        own = false;
    }
    
    if (isBlockStatement(path))
        own = true;
    
    return [own, loc];
}

function getName(path) {
    do {
        if (!path.isMemberExpression())
            return path;
    } while (path = path.get('object'));
}

function getKeys({node}) {
    if (!node)
        return [];
    
    const {id} = node;
    
    if (!id)
        return [];
    
    const {properties} = id;
    
    if (!properties)
        return [];
    
    return properties.map(getKey);
}
