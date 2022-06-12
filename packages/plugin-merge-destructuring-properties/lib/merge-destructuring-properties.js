'use strict';

const {
    types,
    operator,
} = require('putout');

const {compare} = operator;
const {isObjectPattern} = types;
const notEmptyPlaces = (a) => a.places.length;

module.exports.report = () => 'Object properties should be merged when destructuring';

module.exports.fix = ({path, places}) => {
    const {node} = path;
    
    for (const place of places) {
        node.id.properties = [
            ...node.id.properties,
            ...place.node.id.properties,
        ];
        
        place.remove();
    }
};

module.exports.traverse = ({push, store}) => {
    const add = addVariable({
        store,
    });
    
    return {
        VariableDeclarator(path) {
            const {
                id,
                init,
            } = path.node;
            
            if (!isObjectPattern(id))
                return;
            
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
    const str = `${uid}-${path.get('init').toString()}`;
    
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
    
    const is = compare(currentPath.node.init, node);
    
    if (is && sameKind(path, currentPath))
        currentVar.places.push(path);
};

function sameKind(path1, path2) {
    const kind1 = path1.parentPath.node.kind;
    const kind2 = path2.parentPath.node.kind;
    
    return kind1 === kind2;
}
