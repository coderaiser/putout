import {
    template,
    types,
    operator,
} from 'putout';

const {isCallExpression} = types;

const {
    replaceWith,
    setLiteralValue,
    remove,
} = operator;

const nodeRun = template.ast('run(["lint", "coverage"])');

export const report = () => `Use 'wisdom' instead of 'prepublishOnly'`;

export const fix = (path) => {
    if (isCallExpression(path)) {
        replaceWith(path, nodeRun);
        return;
    }
    
    for (const property of path.parentPath.get('properties')) {
        if (property.node.key.value === 'wisdom') {
            remove(path);
            return;
        }
    }
    
    setLiteralValue(path.node.key, 'wisdom');
};

export const traverse = ({push}) => ({
    'run(["lint", "test"])': (path) => {
        push(path);
    },
    ObjectProperty(path) {
        const {key} = path.node;
        
        if (key.value !== 'prepublishOnly')
            return;
        
        push(path);
    },
});
