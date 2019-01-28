'use strict';

const {
    types
} = require('putout');

const generate = require('@babel/generator').default;

const {
    isObjectPattern
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
        }
    });
    
    return Object
        .values(vars)
        .filter(notEmptyPlaces);
};

const addVariable = ({vars}) => (path, node) => {
    const {uid} = path.scope;
    const {code} = generate(node);
    
    const id = `${uid}-${code}`;
    
    if (vars[id])
        return vars[id].places.push(path);
    
    vars[id] = {
        path,
        places: [],
    };
};

