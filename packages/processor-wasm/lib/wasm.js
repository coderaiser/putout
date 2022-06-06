import {lint} from './lint.js';

export const files = [
    '*.wat',
    '*.wast',
];

export const find = (source) => {
    const result = lint(source);
    
    return result.places;
};

export const fix = (source) => {
    const {code} = lint(source, {
        fix: true,
    });
    
    return code;
};

