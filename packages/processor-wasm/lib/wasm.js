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
