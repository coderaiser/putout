import {types} from 'putout';

const {assign} = Object;
const {isMemberExpression} = types;

export const report = (path) => {
    if (isMemberExpression(path)) {
        const {name} = path.node.object;
        
        return `Use 'globalThis' instead of '${name}'`;
    }
    
    const {name} = path.node.declarations[0].init;
    
    return `Use 'globalThis' instead of '${name}'`;
};

const globals = [
    'global',
    'window',
    'self',
];

export const replace = () => {
    const transforms = {};
    
    for (const global of globals) {
        assign(transforms, {
            [`${global}.__a`]: `globalThis.__a`,
            [`const __a = ${global}`]: `const __a = globalThis`,
        });
    }
    
    return transforms;
};
