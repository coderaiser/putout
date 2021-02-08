'use strict';

const {
    operator,
    types,
    template,
} = require('putout');

const {replaceWith} = require('putout').operator;

const {traverse} = operator;

const {
    ObjectPattern,
    ObjectProperty,
    Identifier,
} = types;

module.exports.report = () => '"stub" should be declared';

module.exports.match = () => ({
    'stub()': (vars, path) => {
        const {stub} = path.scope.getAllBindings();
        return !stub;
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
    let supertapePath;
    const programPath = path.scope.getProgramParent().path;
    
    traverse(programPath, {
        'require("supertape")': (path) => {
            supertapePath = path.parentPath;
        },
    });
    
    if (!supertapePath) {
        const node = template.ast('const {test, stub} = require("supertape")');
        
        programPath.node.body
            .unshift(node);
        
        supertapePath = programPath.get('body.0.declarations.0');
    }
    
    return supertapePath;
}

