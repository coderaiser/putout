import {types, operator} from 'putout';

const {remove, compare} = operator;

const {
    isObjectPattern,
    isRestElement,
    isAssignmentExpression,
} = types;

const notEmptyPlaces = (a) => a.places.length;

const LEFT = {
    VariableDeclarator: 'id',
    AssignmentExpression: 'left',
};

const RIGHT = {
    VariableDeclarator: 'init',
    AssignmentExpression: 'right',
};

export const report = () => 'Merge object properties when destructuring';

export const fix = ({path, places}) => {
    merge(path, places);
};

export const traverse = ({push, store}) => {
    const add = addVariable({
        store,
    });
    
    return {
        'VariableDeclarator|AssignmentExpression'(path) {
            const {left, right} = split(path);
            
            if (!right)
                return;
            
            if (!isObjectPattern(left))
                return;
            
            for (const property of left.properties) {
                if (isRestElement(property))
                    return;
            }
            
            add(path, right);
        },
        Program: {
            exit() {
                store()
                    .filter(notEmptyPlaces)
                    .filter(checkPlaces)
                    .map(push);
            },
        },
    };
};

function checkPlaces({places}) {
    return places.filter(hasParentNode).length;
}

const hasParentNode = (path) => Boolean(path.parentPath.node);

const createUID = (path) => {
    const {uid} = path.scope;
    const {type} = path;
    const name = RIGHT[type];
    
    const str = `${uid}-${path.get(name).toString()}`;
    
    return str.replace(/['"`]/g, '*');
};

const addVariable = ({store}) => (path, node) => {
    const str = createUID(path);
    const currentVar = store(str);
    
    if (!currentVar) {
        store(str, {
            path,
            places: [],
        });
        
        return;
    }
    
    const currentPath = currentVar.path;
    
    if (path === currentPath)
        return;
    
    const {parentPath, type} = currentPath;
    
    if (currentPath.removed || !currentPath.node)
        return;
    
    if (parentPath.removed || !parentPath.node)
        return;
    
    const name = RIGHT[type];
    
    if (isAssignmentExpression(currentPath) && compare(currentPath.node[name], node))
        return currentVar.places.push(path);
    
    if (sameKind(path, currentPath))
        return currentVar.places.push(path);
};

function sameKind(path1, path2) {
    const kind1 = path1.parentPath.node.kind;
    const kind2 = path2.parentPath.node.kind;
    
    return kind1 === kind2;
}

function split(path) {
    const {type} = path;
    const leftName = LEFT[type];
    const rightName = RIGHT[type];
    const left = path.node[leftName];
    const right = path.node[rightName];
    
    return {
        left,
        right,
    };
}

function merge(path, places) {
    const {node, type} = path;
    const name = LEFT[type];
    
    for (const place of places) {
        node[name].properties = [
            ...node[name].properties,
            ...place.node[name].properties,
        ];
        
        remove(place);
    }
}
