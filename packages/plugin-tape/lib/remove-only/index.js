const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

export const report = () => `Remove 'test.only'`;

export const replace = () => ({
    '__a.only(__b, __c)': '__a(__b, __c)',
    '__a.only(__b, __c, __d)': '__a(__b, __c, __d)',
});

export const filter = (path, {options}) => {
    const {allowed = []} = options;
    const objectPath = path.get('callee.object');
    
    if (!objectPath.isIdentifier())
        return false;
    
    const {name} = objectPath.node;
    
    const all = [
        'test',
        ...maybeArray(allowed),
    ];
    
    for (const allowedName of all) {
        if (name.startsWith(allowedName))
            return true;
    }
    
    return false;
};
