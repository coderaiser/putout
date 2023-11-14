import removeBlankLines from 'remove-blank-lines';
import {name} from './name.cjs';

const prefix = `${name}(`;
const sufix = ');\n';
const maybeNewline = (a) => a.at(-1) === '\n' ? a : `${a}\n`;

export const files = ['*.json'];
export const toJS = (source) => `${prefix}${source}${sufix}`;
export const fromJS = (source) => {
    const length = source.length - sufix.length;
    const sliced = source.slice(prefix.length, length);
    
    return maybeNewline(removeBlankLines(sliced));
};
export const branch = (rawSource) => {
    const source = toJS(rawSource);
    
    return [{
        source,
    }];
};
export const merge = (rawSource, list) => {
    const [source] = list;
    return fromJS(source);
};
