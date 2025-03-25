import {operator} from 'putout';

const {isESM} = operator;
const createName = (a) => isESM(a) ? 'import.meta.url' : '__dirname';

export const report = () => `Add '__dirname/import.meta.url' as first argument`;

export const replace = () => ({
    'matchToFlatDir(__a)': (vars, path) => {
        const name = createName(path);
        return `matchToFlatDir(${name}, __a)`;
    },
    'mergeESLintConfigs(__a)': (vars, path) => {
        const name = createName(path);
        return `mergeESLintConfigs(${name}, __a)`;
    },
});
