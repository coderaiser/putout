import {
    template,
    operator,
    types,
} from 'putout';

const {
    isStringLiteral,
    isIdentifier,
    isObjectProperty,
    identifier,
    objectProperty,
} = types;

const {
    insertAfter,
    replaceWith,
    setLiteralValue,
} = operator;

const SWC_OPTIONS = `({
    jsc: {
        parser: {
            syntax: 'ecmascript',
        },
    },
    env: {
        targets: 'defaults',
    },
})`;

export const report = () => `Use 'builtin:swc-loader' instead of 'babel-loader'`;

export const fix = ({path, optionsProp}) => {
    setLiteralValue(path, 'builtin:swc-loader');
    
    if (optionsProp) {
        replaceWith(optionsProp.get('value'), template.ast(SWC_OPTIONS));
        return;
    }
    
    const {parentPath} = path;
    const property = objectProperty(identifier('options'), template.ast(SWC_OPTIONS));
    
    insertAfter(parentPath, property);
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        const properties = path.get('properties').filter(isObjectProperty);
        
        for (const prop of properties) {
            if (!isBabelLoader(prop))
                continue;
            
            const loaderPath = prop.get('value');
            
            const optionsProp = properties.find(isOptions);
            
            push({
                path: loaderPath,
                optionsProp,
            });
        }
    },
});

const isLoader = (path) => isIdentifier(path.node.key, {
    name: 'loader',
});

const isOptions = (path) => isIdentifier(path.node.key, {
    name: 'options',
});

const isBabelLoader = (path) => isLoader(path) && isStringLiteral(path.node.value, {
    value: 'babel-loader',
});
