import {operator} from 'putout';

const {replaceWith} = operator;

export const report = () => {
    return `Use 'operator.replaceWithMultiple()' instead of 'path.replaceWithMultiple()'`;
};

export const fix = ({path, calleePath, property, object}) => {
    replaceWith(calleePath, property);
    path.node.arguments.unshift(object);
};

export const traverse = ({push}) => ({
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
