import {types} from 'putout';

const {isIdentifier, identifier} = types;

export const report = () => {
    return `"noTransformCode" should be called instead of using same arguments twice in "transformCode"`;
};

export const traverse = ({push}) => ({
    CallExpression(path) {
        const calleePath = path.get('callee');
        
        if (!calleePath.isMemberExpression())
            return;
        
        const {object, property} = calleePath.node;
        
        if (object.name !== 't' || property.name !== 'transformCode')
            return;
        
        const [a, b] = path.node.arguments;
        
        if (!isIdentifier(a) || !isIdentifier(b))
            return;
        
        if (a.name !== b.name)
            return;
        
        push({
            path,
            calleePath,
        });
    },
});

export const fix = ({path, calleePath}) => {
    calleePath.node.property = identifier('noTransformCode');
    path.node.arguments.pop();
};
