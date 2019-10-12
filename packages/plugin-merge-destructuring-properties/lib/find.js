'use strict';

const {
    types,
    operate,
} = require('putout');

const {compare} = operate;

const {
    isObjectPattern,
} = types;

const notEmptyPlaces = (a) => a.places.length;

module.exports = (ast, {traverse}) => {
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
    for (let i = 0; i < vars.length; i++) {
        const {uid} = vars[i];
        
        if (uid !== path.scope.uid)
            continue;
        
        const currentPath = vars[i].path;
        is = compare(currentPath.node.init, node);
        
        if (is && sameKind(path, currentPath) && uid === path.scope.uid)
            vars[i].places.push(path);
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
