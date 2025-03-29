export const report = () => `Remove 'test.only'`;

export const replace = () => ({
    '__a.only(__b, __c)': '__a(__b, __c)',
    '__a.only(__b, __c, __d)': '__a(__b, __c, __d)',
});

export const filter = (path) => {
    const objectPath = path.get('callee.object');
    
    if (!objectPath.isIdentifier())
        return false;
    
    return objectPath.node.name.startsWith('test');
};
