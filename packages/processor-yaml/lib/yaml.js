'use strict';

const yaml = require('js-yaml');
const jsonProcessor = require('@putout/processor-json');
const tryCatch = require('try-catch');

const {stringify, parse} = JSON;
const bigFirst = (a) => a[0].toUpperCase() + a.slice(1);

module.exports.files = [
    '*.yml',
    '*.yaml',
];

module.exports.preProcess = (rawSource) => {
    const list = [];
    const [{source}] = jsonProcessor.preProcess(rawSource, null, 2);
    
    list.push({
        source,
        extension: 'json',
    });
    
    return list;
};

module.exports.process = (rawSource) => {
    const [error, value] = tryCatch(yaml.load, rawSource);
    
    const noPlaces = [];
    
    if (!error)
        return [stringify(value), noPlaces];
    
    const places = parsePlaces(error);
    return ['', places];
};

module.exports.postProcess = (rawSource, list) => {
    const source = jsonProcessor.postProcess(rawSource, list);
    const result = yaml.dump(parse(source));
    
    return result;
};

function parsePlaces(error) {
    const {mark, reason} = error;
    const {line} = mark;
    const position = {
        line: line + 1,
        column: 1,
    };
    
    const message = error.message
        .replace(/\sat.*/, '')
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(': ^', '');
    
    const place = {
        message: bigFirst(message),
        position,
        rule: `${reason.replace(/\s/g, '-')} (yaml)`,
    };
    
    return [place];
}
