import {extend} from 'supertape';
import {parse, print} from 'putout';
import {
    toJS,
    fromJS,
    __filesystem,
} from '@putout/operator-json';
import {parseSimpleFilesystem} from './parse-simple-filesystem.mjs';

const {isArray} = Array;
const {stringify} = JSON;

const PRINTER = ['putout', {
    format: {
        quote: '"',
        endOfFile: '',
    },
    semantics: {
        trailingComma: false,
    },
}];

export const test = extend({
    equalFilesystems: ({equal}) => (a, b) => {
        return equal(printFilesystem(a), formatFilesystem(b));
    },
    filesystem: ({deepEqual}) => (a, b) => deepEqual(a, b),
});

export function parseFilesystem(fs) {
    if (isArray(fs))
        fs = parseSimpleFilesystem(fs);
    
    const source = toJS(stringify(fs, null, 4), __filesystem);
    
    return parse(source);
}

export function printFilesystem(ast) {
    const source = print(ast, {
        printer: PRINTER,
    });
    
    return fromJS(source, __filesystem);
}

export function formatFilesystem(fs) {
    const source = print(parseFilesystem(fs), {
        printer: PRINTER,
    });
    
    return fromJS(source, __filesystem);
}
