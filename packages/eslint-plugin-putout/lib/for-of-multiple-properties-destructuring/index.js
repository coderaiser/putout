export const category = 'destructuring';
export const report = () => 'Keep all properties in one line when using destructuring in for-of';

export const include = ({options}) => {
    const {maxProperties = 8} = options[0] || {};
    
    return [`VariableDeclarator[id.type="ObjectPattern"][id.properties.length<${maxProperties}]`];
};

export const filter = ({node, text}) => {
    if (node.parent.parent.type !== 'ForOfStatement')
        return false;
    
    return text.includes('\n');
};

export const fix = ({text}) => {
    return text
        .replace(/\n/g, '')
        .replace(/,/g, ', ')
        .replace(/{\s*/g, '{')
        .replace(/\s*}/g, '}');
};
