import {
    operator,
    template,
    types,
} from 'putout';
import fullstore from 'fullstore';

const {objectProperty, identifier} = types;

const {
    replaceWith,
    insertAfter,
    insertBefore,
} = operator;

export const report = () => {
    return `Use 'operator.replaceWith()' instead of 'path.replaceWith()'`;
};

export const fix = ({path, calleePath, property, object, program, isInserted}) => {
    replaceWith(calleePath, property);
    const {bindings} = program.scope;
    
    path.node.arguments.unshift(object);
    
    if (bindings.replaceWith || isInserted())
        return;
    
    if (!bindings.replaceWithMultiple && !bindings.insertAfter && !isInserted()) {
        const replaceWithAST = template.ast.fresh(`
            const {replaceWith} = require('putout').operator;
        `);
        
        const {types} = bindings;
        const first = program.get('body.0');
        const pathToInsert = types ? types.path.parentPath : first;
        
        if (types)
            insertAfter(pathToInsert, replaceWithAST);
        else
            insertBefore(pathToInsert, replaceWithAST);
        
        isInserted(true);
        
        return;
    }
    
    const id = identifier('replaceWith');
    const varPath = getVarPath(bindings);
    
    varPath.node.id.properties.unshift(objectProperty(id, id, false, true));
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

export const traverse = ({push}) => {
    const isInserted = fullstore();
    
    return {
        CallExpression(path) {
            const calleePath = path.get('callee');
            
            if (!calleePath.isMemberExpression())
                return;
            
            const {object, property} = calleePath.node;
            
            if (property.name !== 'replaceWith')
                return;
            
            const program = path.scope.getProgramParent().path;
            
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
