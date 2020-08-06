'use strict';

const {
    operator,
    template,
    types,
} = require('putout');

const {
    replaceWith,
    insertAfter,
} = operator;

const {
    Identifier,
    ObjectProperty,
} = types;

const fullstore = require('fullstore');

module.exports.report = () => {
    return `"operator.remove" should be called instead of "path.remove"`;
};

const replaceWithAST = template.ast(`
    const {remove} = require('putout').operator;
`);

module.exports.fix = ({path, calleePath, property, object, program, isInserted}) => {
    replaceWith(calleePath, property);
    
    const strictModePath = program.get('body.0');
    const {bindings} = strictModePath.scope;
    
    path.node.arguments.unshift(object);
    
    if (bindings.remove || isInserted())
        return;
    
    if (!bindings.replaceWithMultiple && !bindings.insertAfter && !isInserted()) {
        isInserted(true);
        insertAfter(strictModePath, replaceWithAST);
        return;
    }
    
    const id = Identifier('remove');
    const varPath = getVarPath(bindings);
    
    varPath.node.id.properties
        .unshift(ObjectProperty(id, id, false, true));
};

function getVarPath(bindings) {
    const {
        replaceWithMultiple,
        insertAfter,
    } = bindings;
    
    if (replaceWithMultiple)
        return replaceWithMultiple.path;
    
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
            
            if (property.name !== 'remove')
                return;
            
            const programParent = path.scope.getProgramParent();
            const program = programParent.path;
            
            push({
                isInserted,
                path,
                object,
                program,
                property,
                calleePath,
            });
        },
    };
};

