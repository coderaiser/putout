import {
    wrapInNamespace,
    unwrapNamespace,
} from '@putout/operator-wasm';
import {parse as convertWasmToJS} from '@nirguna/parser-wasm';
import {print as convertJsToWasm} from '@nirguna/printer-wasm';
import {tryCatch} from 'try-catch';
import {lint} from './lint.js';
import {rules as plugins} from './rules/index.js';

export const files = [
    '*.wat',
    '*.wast',
];

export const find = (source) => {
    const result = lint(source, {
        fix: false,
        plugins,
    });
    
    return result.places;
};

export const fix = (source) => {
    const {code} = lint(source, {
        fix: true,
        plugins,
    });
    
    return code;
};

export const branch = (raw) => {
    const [error, js] = tryCatch(convertWasmToJS, raw);
    
    if (error)
        return [];
    
    const source = wrapInNamespace(js);
    
    const list = [{
        startLine: 0,
        source,
        extension: 'ts',
    }];
    
    return list;
};

export const merge = (raw, list) => {
    const [result] = list;
    return convertJsToWasm(unwrapNamespace(result));
};
