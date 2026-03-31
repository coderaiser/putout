import {
    __docker,
    toJS,
    fromJS,
    isDocker,
} from '@putout/operator-json';
import {parse} from './parse.js';
import {print} from './print.js';

const {stringify} = JSON;

export const files = ['Dockerfile*'];

export const branch = (rawSource) => {
    const list = [];
    const value = parse(rawSource);
    
    const stringified = stringify(value, null, 4);
    const source = toJS(stringified, __docker);
    
    list.push({
        source,
        extension: 'json',
    });
    
    return list;
};

export const merge = (rawSource, list) => {
    const [first] = list.filter(isDocker);
    const source = fromJS(first, __docker);
    
    return print(JSON.parse(source));
};
