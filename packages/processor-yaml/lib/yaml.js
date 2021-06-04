'use strict';

const tryCatch = require('try-catch');

const bigFirst = (a) => a[0].toUpperCase() + a.slice(1);
const {stringify, parse} = JSON;

module.exports.files = [
    '*.yml',
    '*.yaml',
];

module.exports.branch = (rawSource) => {
    const yaml = require('js-yaml');
    const jsonProcessor = require('@putout/processor-json');
    
    const list = [];
    const [error, value] = tryCatch(yaml.load, rawSource);
    
    if (error)
        return [];
    
    const stringified = stringify(value, null, 2);
    const [{source}] = jsonProcessor.branch(stringified, null, 2);
    
    list.push({
        source,
        extension: 'json',
    });
    
    return list;
};

module.exports.find = (rawSource) => {
    const yaml = require('js-yaml');
    
    const [error] = tryCatch(yaml.load, rawSource);
    const places = parsePlaces(error);
    
    return places;
};

module.exports.merge = (rawSource, list) => {
    const yaml = require('js-yaml');
    const jsonProcessor = require('@putout/processor-json');
    const source = jsonProcessor.merge(rawSource, list);
    
    return yaml.dump(parse(source));
};

function parsePlaces(error) {
    if (!error)
        return [];
    
    const {mark, reason} = error;
    const {line} = mark;
    const position = {
        line: line + 1,
        column: 1,
    };
    
    const [message] = error.message.split('\n');
    const place = {
        message: bigFirst(message),
        position,
        rule: `${reason.replace(/\s/g, '-')} (yaml)`,
    };
    
    return [place];
}

