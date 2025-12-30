import {normalize} from 'node:path';
import picomatch from 'picomatch';
import fullstore from 'fullstore';

const noop = () => {};
const isMatchStore = fullstore();

let patterns = [];

const rmDuplicates = (a) => Array.from(new Set(a));

export const add = (array) => {
    patterns = rmDuplicates(patterns.concat(array));
    
    const isMatch = picomatch(patterns, {
        dot: true,
        matchBase: true,
    });
    
    isMatchStore(isMatch);
};

export const isSupported = (name) => {
    const isMatch = isMatchStore();
    return isMatch(name);
};

export const clear = () => {
    isMatchStore(noop);
    patterns = [];
};

export const getSupportedGlob = (file) => normalize(`${file}/**/{${patterns.join(',')}}`);

export const getPatterns = () => patterns;
