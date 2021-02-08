'use strict';

const {
    types,
    template,
    operator,
} = require('putout');

const {replaceWith, compare} = operator;

const {
    ObjectPattern,
    ObjectProperty,
    Identifier,
} = types;

module.exports.report = () => '"stub" should be declared';

module.exports.match = () => ({
    'stub()': (vars, path) => {
        return !path.scope.hasBinding('stub');
    },
});

module.exports.replace = () => ({
    'stub()': (vars, path) => {
        const supertapePath = findSupertape(path);
        
        const computed = false;
        const shorthand = true;
        const idTest = Identifier('test');
        const idStub = Identifier('stub');
        
        const id = ObjectPattern([
            ObjectProperty(idTest, idTest, computed, shorthand),
            ObjectProperty(idStub, idStub, computed, shorthand),
        ]);
        
        replaceWith(supertapePath.get('id'), id);
        path.scope.getProgramParent().crawl();
        
        return path;
    },
});

function findSupertape(path) {
    const programPath = path.scope.getProgramParent().path;
    const declaration = 'declarations.0';
    
    for (const el of programPath.get('body')) {
        if (compare(el, 'const test = require("supertape")')) {
            return el.get(declaration);
        }
    }
    
    const node = template.ast('const {test, stub} = require("supertape")');
    
    programPath.node.body
        .unshift(node);
    
    return programPath.get(`body.0.${declaration}`);
}

