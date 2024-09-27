import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {
    getProperty,
    __json,
    setLiteralValue,
} = operator;

export const report = () => `Apply 'https' to repository.url`;

export const fix = (path) => {
    const {value} = path.node;
    setLiteralValue(path, value.replace('git:', 'git+https:'));
};

export const traverse = ({push}) => ({
    [__json](path) {
        const arg = path.get('arguments.0');
        const repository = getProperty(arg, 'repository');
        
        if (!repository)
            return;
        
        const value = repository.get('value');
        
        if (!isObjectExpression(value))
            return;
        
        const urlPathProp = getProperty(value, 'url');
        
        if (!urlPathProp)
            return;
        
        const urlPathValue = urlPathProp.get('value');
        
        if (!urlPathValue.node.value.startsWith('git:'))
            return;
        
        push(urlPathValue);
    },
});
