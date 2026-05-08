import {operator} from 'putout';
import justCamelCase from 'just-camel-case';

const {
    __json,
    setLiteralValue,
} = operator;

export const report = (path) => {
    const {value} = path.node;
    const to = justCamelCase(value);
    
    return `Use camelCase instead of kebab: '${value}' -> '${to}'`;
};

export const fix = (path) => {
    const {value} = path.node;
    setLiteralValue(path, justCamelCase(value));
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const properties = path.get('arguments.0.properties');
        
        for (const prop of properties) {
            const keyPath = prop.get('key');
            const {value} = keyPath.node;
            
            if (value.includes('-'))
                push(keyPath);
        }
    },
});
