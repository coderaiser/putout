import {operator} from 'putout';

const {__ignore} = operator;
const getValue = ({value}) => value;
const notLegacy = ({value}) => value !== 'madrun.js';

export const report = () => 'legacy should be removed from .gitignore';

export const match = () => ({
    [__ignore]: ({__array}) => {
        const list = __array.elements.map(getValue);
        return list.includes('madrun.js');
    },
});

export const replace = () => ({
    [__ignore]: ({__array}, path) => {
        __array.elements = __array.elements.filter(notLegacy);
        return path;
    },
});
