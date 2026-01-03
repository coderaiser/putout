import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Use 'import {createRequire}' -> 'import module' for rollup'`;

export const match = () => ({
    'import {createRequire} from "node:module"': isTest,
    'const require = createRequire(import.meta.url)': isTest,
});

export const replace = () => ({
    'import {createRequire} from "node:module"': `{
        import module from "node:module";
        const {createRequire = returns(noop)} = module;
    }`,
    'import {createRequire as __a} from "node:module"': `{
        import module from "node:module";
        const {createRequire: __a = returns(noop)} = module;
    }`,
});

function isTest(vars, path) {
    const {body} = path.parentPath.node;
    
    for (const current of body) {
        if (compare(current, 'import __imports from "supertape"'))
            return false;
    }
    
    return true;
}
