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

module.exports.find = (ast, {traverse}) => {
    const vars = [];
    const add = addVariable({
        vars,
    });
    
    traverse(ast, {
        VariableDeclarator(path) {
            const {
                id,
                init,
            } = path.node;
            
            if (!isObjectPattern(id))
                return;
            
            add(path, init);
        },
    });
    
    return vars
        .filter(notEmptyPlaces);
};

const addVariable = ({vars}) => (path, node) => {
    let is = false;
    for (const currentVar of vars) {
        const {uid} = currentVar;
        
        if (uid !== path.scope.uid)
            continue;
        
        const currentPath = currentVar.path;
        is = compare(currentPath.node.init, node);
        
        if (is && sameKind(path, currentPath) && uid === path.scope.uid)
            currentVar.places.push(path);
    }
    
    if (!is)
        vars.push({
            path,
            uid: path.scope.uid,
            places: [],
        });
};

function sameKind(path1, path2) {
    const kind1 = path1.parentPath.node.kind;
    const kind2 = path2.parentPath.node.kind;
    
    return kind1 === kind2;
}
