import {
    __ignore,
    toJS,
    fromJS,
} from '@putout/operator-json';

const {stringify} = JSON;
const rmLast = (a) => !a.endsWith('\n') ? a : a.slice(0, -1);

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
    const source = toJS(array, __ignore);
    
    return [{
        source,
        extension: 'json',
    }];
};

export const merge = (rawSource, list) => {
    const [source] = list;
    const str = fromJS(source, __ignore);
    const array = parse(str);
    
    return array.join('\n') + '\n';
};

function convertToArray(str) {
    const safeStr = str.replace(/\r/g, '');
    const lines = rmLast(safeStr).split(/\n/g);
    
    return stringify(lines);
}
