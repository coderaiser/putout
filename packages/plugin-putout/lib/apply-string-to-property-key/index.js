import {operator, types} from 'putout';

const {
    isTemplateLiteral,
    stringLiteral,
} = types;

const {replaceWith} = operator;

export const report = () => `Use 'string' instead of 'template' in property key`;

export const fix = (path) => {
    const {quasis} = path.node;
    const [first] = quasis;
    const value = first.value.cooked.replaceAll(`'`, '"');
    
    replaceWith(path, stringLiteral(value));
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const keyPath = path.get('key');
        
        if (!isTemplateLiteral(keyPath))
            return;
        
        const {quasis} = keyPath.node;
        
        if (quasis.length > 1)
            return;
        
        push(keyPath);
    },
});
