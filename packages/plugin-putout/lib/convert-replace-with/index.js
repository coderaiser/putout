import {operator} from 'putout';
import {fullstore} from 'fullstore';

const {replaceWith} = operator;

export const report = () => {
    return `Use 'operator.replaceWith()' instead of 'path.replaceWith()'`;
};

export const fix = ({path, calleePath, property, object}) => {
    replaceWith(calleePath, property);
    path.node.arguments.unshift(object);
};

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
