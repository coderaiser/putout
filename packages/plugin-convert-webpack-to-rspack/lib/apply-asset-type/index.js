import {
    template,
    types,
    operator,
} from 'putout';

const {
    isObjectProperty,
    stringLiteral,
    identifier,
    objectProperty,
    isStringLiteral,
    isIdentifier,
} = types;
const {insertAfter, remove} = operator;

const isUse = (path) => isIdentifier(path.node.key, {
    name: 'use',
});

const isOptions = (path) => isIdentifier(path.node.key, {
    name: 'options',
});

const isLimit = (path) => isIdentifier(path.node.key, {
    name: 'limit',
});

const isUrlLoader = (path) => isStringLiteral(path.node.value, {
    value: 'url-loader',
});

export const report = () => `Use rspack built-in 'asset' type instead of 'url-loader'`;

export const fix = ({path, propertyUse, propertyLimit}) => {
    const limit = propertyLimit.node.value.extra.raw;
    
    remove(propertyUse);
    
    const [firstProp] = path.get('properties');
    const propertyParser = objectProperty(identifier('parser'), template.ast(`({
        dataUrlCondition: {
            maxSize: ${limit},
        },
    })`));
    
    const propertyType = objectProperty(identifier('type'), stringLiteral('asset'));
    
    insertAfter(firstProp, propertyParser);
    insertAfter(firstProp, propertyType);
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        const topProperties = path.get('properties').filter(isObjectProperty);
        
        for (const propertyUse of topProperties) {
            if (!isUse(propertyUse))
                continue;
            
            const properties = propertyUse.get('value.properties').filter(isObjectProperty);
            
            for (const property of properties) {
                if (!isUrlLoader(property))
                    continue;
                
                const propertyOptions = properties.find(isOptions);
                
                const propertyLimit = propertyOptions.get('value.properties').filter(isObjectProperty)
                    .find(isLimit);
                
                push({
                    path,
                    propertyUse,
                    propertyLimit,
                });
            }
        }
    },
});
