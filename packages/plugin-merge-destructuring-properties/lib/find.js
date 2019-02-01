'use strict';

const {
    types,
    generate,
} = require('putout');

const {
    isObjectPattern,
} = types;

const notEmptyPlaces = (a) => a.places.length;

module.exports= (ast, {traverse}) => {
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
    
    return Object
        .values(vars)
        .filter(notEmptyPlaces);
};

const addVariable = ({vars}) => (path, node) => {
    const {uid} = path.scope;
    const {code} = generate(node);
    
    const id = `${uid}-${code}`;
    
    if (vars[id] && sameKind(vars[id].path, path))
        return vars[id].places.push(path);
    
    vars[id] = {
        path,
        places: [],
    };
};

function sameKind(path1, path2) {
    const kind1 = path1.parentPath.node.kind;
    const kind2 = path2.parentPath.node.kind;
    
    return kind1 === kind2;
}

