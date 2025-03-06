'use strict';

const {
    operator,
    template,
    types,
} = require('putout');

const {objectProperty, identifier} = types;
const {replaceWith, insertBefore} = operator;

module.exports.report = () => {
    return `"operate.replaceWithMultiple" should be called instead of "path.replaceWithMultiple"`;
};

const replaceWithAST = template.ast(`
    const {replaceWithMultiple} = require('putout').operate;
`);

module.exports.fix = ({path, calleePath, property, object, program}) => {
    const first = program.get('body.0');
    const {bindings} = program.scope;
    
    replaceWith(calleePath, property);
    path.node.arguments.unshift(object);
    
    if (bindings.replaceWithMultiple)
        return;
    
    if (!bindings.replaceWith && !bindings.insertAfter)
        return insertBefore(first, replaceWithAST);
    
    const id = identifier('replaceWithMultiple');
    const varPath = getVarPath(bindings);
    
    varPath.node.id.properties.push(objectProperty(id, id, false, true));
};

function getVarPath(bindings) {
    const {replaceWith, insertAfter} = bindings;
    
    if (replaceWith)
        return replaceWith.path;
    
    return insertAfter.path;
}

module.exports.traverse = ({push}) => ({
    CallExpression(path) {
        const calleePath = path.get('callee');
        
        if (!calleePath.isMemberExpression())
            return;
        
        const {object, property} = calleePath.node;
        
        if (property.name !== 'replaceWithMultiple')
            return;
        
        const program = path.scope.getProgramParent().path;
        
        push({
            path,
            object,
            program,
            calleePath,
            property,
        });
    },
});
