'use strict';

const {
    operator,
    template,
    types,
} = require('putout');

const {
    insertAfter,
    replaceWith,
    insertBefore,
} = operator;
const {Identifier, ObjectProperty} = types;

const isRecast = (program) => program.get('body.0').get('expression')
    .isStringLiteral({
        value: 'use strict',
    });

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
    
    if (!bindings.replaceWith && !bindings.insertAfter) {
        if (isRecast(program))
            return insertAfter(first, replaceWithAST);
        
        return insertBefore(first, replaceWithAST);
    }
    
    const id = Identifier('replaceWithMultiple');
    const varPath = getVarPath(bindings);
    
    varPath.node.id.properties.push(ObjectProperty(id, id, false, true));
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
