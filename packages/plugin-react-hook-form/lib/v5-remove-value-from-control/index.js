export const report = () => `Remove 'value property' from 'control' attribute`;

export const match = () => ({
    '({value: __a})': (vars, path) => {
        if (!path.parentPath.parentPath.isJSXExpressionContainer())
            return false;
        
        const attributePath = path.parentPath.parentPath.parentPath;
        const namePath = attributePath.get('name');
        
        return Boolean(namePath.isJSXIdentifier({
            name: 'control',
        }));
    },
});

export const replace = () => ({
    '({value: __a})': '__a',
});
