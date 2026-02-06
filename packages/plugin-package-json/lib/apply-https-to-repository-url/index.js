import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {
    getProperty,
    __json,
    setLiteralValue,
} = operator;

export const report = () => `Apply 'https' to 'repository.url'`;

export const fix = (path) => {
    const {value} = path.node;
    const newValue = value.replace(/^(git|https)/, 'git+https');
    
    setLiteralValue(path, newValue);
};

export const traverse = ({push}) => ({
    [__json](path) {
        const arg = path.get('arguments.0');
        const repository = getProperty(arg, 'repository');
        
        if (!repository)
            return;
        
        const object = repository.get('value');
        
        if (!isObjectExpression(object))
            return;
        
        const urlPathProp = getProperty(object, 'url');
        
        if (!urlPathProp)
            return;
        
        const urlPathValue = urlPathProp.get('value');
        
        const {value} = urlPathValue.node;
        
        if (value.startsWith('git+https'))
            return;
        
        if (/^(git|https)/.test(value))
            push(urlPathValue);
    },
});
