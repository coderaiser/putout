import {operator} from 'putout';

const {replaceWith} = operator;

export const report = () => {
    return `Use 'operator.replaceWith()' instead of 'path.replaceWith()'`;
};

export const fix = ({path, calleePath, property, object}) => {
    replaceWith(calleePath, property);
    path.node.arguments.unshift(object);
};

export const traverse = ({push, store}) => {
    const isInserted = store();
    
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
