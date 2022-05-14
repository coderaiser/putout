import removeBlankLines from 'remove-blank-lines';

const prefix = '__putout_processor_json(';
const sufix = ');';

export const files = [
    '*.json',
];

export const toJS = (source) => `${prefix}${source}${sufix}`;
export const fromJS = (source) => {
    const length = source.length - sufix.length;
    const sliced = source.slice(prefix.length, length);
    
    return removeBlankLines(sliced);
};

export const branch = (rawSource) => {
    const source = toJS(rawSource);
    return [{
        startLine: 0,
        source,
    }];
};

export const merge = (rawSource, list) => {
    const [source] = list;
    return fromJS(source);
};

