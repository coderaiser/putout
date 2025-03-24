import {operator} from 'putout';

const {replaceWith} = operator;

export const report = () => `First "run" argument should be string, if it is single`;

export const fix = ({path, element}) => {
    replaceWith(path, element);
};

export const traverse = ({push}) => ({
    CallExpression(path) {
        if (!path.get('callee').isIdentifier({name: 'run'}))
            return;
        
        const argPath = path.get('arguments.0');
        
        if (!argPath.isArrayExpression())
            return;
        
        const [arg] = path.node.arguments;
        
        if (arg.elements.length !== 1)
            return;
        
        const [element] = arg.elements;
        
        push({
            element,
            path: argPath,
        });
    },
});
