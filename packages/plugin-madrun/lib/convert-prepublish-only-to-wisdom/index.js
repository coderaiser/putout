import {
    template,
    types,
    operator,
} from 'putout';

const {
    replaceWith,
    setLiteralValue,
    remove,
} = operator;

const {isObjectProperty} = types;
const nodeRun = template.ast('run(["lint", "coverage"])');

export const report = () => `Use 'wisdom' instead of 'prepublishOnly'`;

export const fix = (path) => {
    if (isObjectProperty(path)) {
        for (const property of path.parentPath.get('properties')) {
            if (property.node.key.value === 'wisdom') {
                remove(path);
                return;
            }
        }
        
        setLiteralValue(path.node.key, 'wisdom');
        
        return;
    }
    
    replaceWith(path, nodeRun);
};
export const traverse = ({push}) => ({
    'run(["lint", "test"])': (path) => {
        const property = path.parentPath.parentPath;
        
        if (property.node.key.value !== 'prepublishOnly')
            return;
        
        push(path);
    },
    ObjectProperty(path) {
        const {key} = path.node;
        
        if (key.value !== 'prepublishOnly')
            return;
        
        push(path);
    },
});
