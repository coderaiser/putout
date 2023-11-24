'use strict';

const {extend} = require('supertape');
const {parse, print} = require('putout');
const {
    toJS,
    fromJS,
    __filesystem,
} = require('@putout/operator-json');

const {parseSimpleFilesystem} = require('./parse-simple-filesystem.test');
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

module.exports.test = extend({
    equalFilesystems: ({equal}) => (a, b) => {
        return equal(printFilesystem(a), formatFilesystem(b));
    },
    filesystem: ({deepEqual}) => (a, b) => deepEqual(a, b),
});

module.exports.parseFilesystem = parseFilesystem;
module.exports.printFilesystem = printFilesystem;
module.exports.formatFilesystem = formatFilesystem;

function parseFilesystem(fs) {
    if (isArray(fs))
        fs = parseSimpleFilesystem(fs);
    
    const source = toJS(stringify(fs, null, 4), __filesystem);
    
    return parse(source);
}

function printFilesystem(ast) {
    const source = print(ast, {
        printer: PRINTER,
    });
    
    return fromJS(source, __filesystem);
}

function formatFilesystem(fs) {
    const source = print(parseFilesystem(fs), {
        printer: PRINTER,
    });
    
    return fromJS(source, __filesystem);
}
