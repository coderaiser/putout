import {types, operator} from 'putout';

const {compare, remove} = operator;

const {
    isObjectPattern,
    isRestElement,
} = types;

const notEmptyPlaces = (a) => a.places.length;

export const report = () => 'Merge object properties when destructuring';

export const fix = ({path, places}) => {
    const {node} = path;
    
    if (path.isVariableDeclarator()) {
        for (const place of places) {
            node.id.properties = [
                ...node.id.properties,
                ...place.node.id.properties,
            ];
            
            remove(place);
        }
        
        return;
    }
    
    for (const place of places) {
        node.left.properties = [
            ...node.left.properties,
            ...place.node.left.properties,
        ];
        
        remove(place);
    }
};

export const traverse = ({push, store}) => {
    const add = addVariable({
        store,
    });
    
    return {
        AssignmentExpression(path) {
            const {left, right} = path.node;
            
            if (!isObjectPattern(left))
                return;
            
            for (const property of left.properties) {
                if (isRestElement(property))
                    return;
            }
            
            add(path, right);
        },
        VariableDeclarator(path) {
            const {id, init} = path.node;
            
            if (!init)
                return;
            
            if (!isObjectPattern(id))
                return;
            
            for (const property of id.properties) {
                if (isRestElement(property))
                    return;
            }
            
            add(path, init);
        },
        Program: {
            exit() {
                store()
                    .filter(notEmptyPlaces)
                    .map(push);
            },
        },
    };
};

const createUID = (path) => {
    const {uid} = path.scope;
    const name = path.isVariableDeclarator() ? 'init' : 'right';
    
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
    
    if (path === currentPath || currentPath.removed)
        return;
    
    if (currentPath.parentPath.removed)
        return;
    
    let is;
    
    if (currentPath.isVariableDeclarator()) {
        is = compare(currentPath.node.init, node);
        is = is && sameKind(path, currentPath);
    } else {
        is = compare(currentPath.node.right, node);
    }
    
    if (is)
        currentVar.places.push(path);
};

function sameKind(path1, path2) {
    const kind1 = path1.parentPath.node.kind;
    const kind2 = path2.parentPath.node.kind;
    
    return kind1 === kind2;
}
