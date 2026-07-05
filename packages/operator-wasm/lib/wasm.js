import {montag} from 'montag';

const cut = (a) => a.slice(0, a.indexOf('{'));
const createPrefix = (name) => {
    if (name.startsWith('namespace'))
        return `${cut(name)}{\n`;
    
    return `namespace ${name} {\n`;
};

const createSuffix = () => '\n}';

export const __wasm_name = '__putout_processor_wasm';

export const __wasm = montag`
    namespace ${__wasm_name} {
        __body
    }
`;

const removeOneLineIndent = (line) => line.replace('    ', '');
const addOneLineIndent = (line) => `    ${line}`;

const addIndent = (a) => a
    .split('\n')
    .map(addOneLineIndent)
    .join('\n');

const removeIndent = (a) => a
    .split('\n')
    .map(removeOneLineIndent)
    .join('\n');

export const wrapInNamespace = (source, name = __wasm) => {
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    const code = addIndent(source);
    
    return `${prefix}${code}${suffix}`;
};

export const unwrapNamespace = (source, name = __wasm) => {
    if (!source.startsWith('namespace'))
        return source;
    
    const shortName = cut(name);
    
    source = source.slice(source.indexOf(shortName));
    
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    const length = source.length - suffix.length;
    const sliced = source.slice(prefix.length, length);
    
    return removeIndent(sliced);
};
