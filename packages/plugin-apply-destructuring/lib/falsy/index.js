const FIRST_PROPERTY = 'declarations.0.id.properties.0';

export const report = (path) => {
    const {name} = path.get(`${FIRST_PROPERTY}.key`).node;
    return `Use destructuring instead of setting '${name}' to 'undefined'`;
};

export const match = () => ({
    'const {__a} = {__b}': (vars, path) => {
        const prop = path.get(FIRST_PROPERTY);
        return !prop.node.computed;
    },
});

export const replace = () => ({
    'const {__a} = {__b}': 'const {__a} = __b',
});
