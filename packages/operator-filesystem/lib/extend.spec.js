'use strict';

const {extend} = require('supertape');
const {parse, print} = require('putout');

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
});

module.exports.parseFilesystem = parseFilesystem;
module.exports.printFilesystem = printFilesystem;
module.exports.formatFilesystem = formatFilesystem;

const FS = '__putout_processor_filesystem';

function wrapFilesystem(fs) {
    return `${FS}(${stringify(fs, null, 4)});`;
}

function unwrapFilesystem(source) {
    return source
        .replace(`${FS}(`, '')
        .replace(');', '');
}

function parseFilesystem(fs) {
    const source = wrapFilesystem(fs);
    return parse(source);
}

function printFilesystem(ast) {
    const source = print(ast, {
        printer: PRINTER,
    });
    
    return unwrapFilesystem(source);
}

function formatFilesystem(fs) {
    const source = print(parseFilesystem(fs), {
        printer: PRINTER,
    });
    
    return unwrapFilesystem(source);
}
