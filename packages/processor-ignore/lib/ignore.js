const {stringify} = JSON;
const rmLast = (a) => !a.endsWith('\n') ? a : a.slice(0, -1);

const prefix = '__putout_processor_ignore(';
const sufix = ');';
const parse = (a) => {
    const fn = Function(`return ${a}`);
    return fn();
};

export const files = [
    '*ignore',
    '*rc',
];

export const branch = (rawSource) => {
    const array = convertToArray(rawSource);
    const source = `${prefix}${array}${sufix}`;
    
    return [{
        startLine: 0,
        source,
        extension: 'json',
    }];
};

export const merge = (rawSource, list) => {
    const [source] = list;
    const length = source.length - sufix.length;
    const str = source.slice(prefix.length, length);
    const array = parse(str);
    
    return array.join('\n') + '\n';
};

function convertToArray(str) {
    const safeStr = str.replace(/\r/g, '');
    const lines = rmLast(safeStr).split(/\n/g);
    
    return stringify(lines);
}

