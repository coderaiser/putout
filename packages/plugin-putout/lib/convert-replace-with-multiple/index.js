'use strict';

const fullstore = require('fullstore');

const {
    operator,
    template,
    types,
} = require('putout');

const {
    insertAfter,
    replaceWith,
} = operator;

const {
    Identifier,
    ObjectProperty,
} = types;

module.exports.report = () => {
    return `"operate.replaceWithMultiple" should be called instead of "path.replaceWithMultiple"`;
};

const replaceWithAST = template.ast(`
    const {replaceWithMultiple} = require('putout').operate;
`);

module.exports.fix = ({path, calleePath, property, object, program, isInserted}) => {
    const strictModePath = program.get('body.0');
    const {bindings} = strictModePath.scope;
    
    replaceWith(calleePath, property);
    path.node.arguments.unshift(object);
    
    if (bindings.replaceWithMultiple)
        return;
    
    if (isInserted())
        return;
    
    isInserted(true);
    
    if (!bindings.replaceWith && !bindings.insertAfter)
        return insertAfter(strictModePath, replaceWithAST);
    
    const id = Identifier('replaceWithMultiple');
    
    const varPath = getVarPath(bindings);
    varPath.node.id.properties
        .push(ObjectProperty(id, id, false, true));
};

function getVarPath(bindings) {
    const {
        replaceWith,
        insertAfter,
    } = bindings;
    
    if (replaceWith)
        return replaceWith.path;
    
    return insertAfter.path;
}

module.exports.traverse = ({push}) => {
    const isInserted = fullstore();
    
    return {
        CallExpression(path) {
            const calleePath = path.get('callee');
            
            if (!calleePath.isMemberExpression())
                return;
            
            const {object, property} = calleePath.node;
            
            if (property.name !== 'replaceWithMultiple')
                return;
            
            const program = path.findParent((path) => path.isProgram());
            
            push({
                isInserted,
                path,
                object,
                program,
                calleePath,
                property,
            });
        },
    };
};

