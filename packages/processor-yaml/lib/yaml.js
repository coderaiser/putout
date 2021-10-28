'use strict';

const tryCatch = require('try-catch');
const justKebabCase = require('just-kebab-case');

const parseRule = (a) => justKebabCase(a.replace('YAML', 'Yaml'));
const {stringify, parse} = JSON;

module.exports.files = [
    '*.yml',
    '*.yaml',
];

module.exports.branch = (rawSource) => {
    const yaml = require('yaml');
    const jsonProcessor = require('@putout/processor-json');
    
    const list = [];
    const [error, value] = tryCatch(yaml.parse, rawSource);
    
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
    const yaml = require('yaml');
    
    const [error] = tryCatch(yaml.parse, rawSource);
    const places = parsePlaces({
        error,
        rawSource,
    });
    
    return places;
};

module.exports.merge = (rawSource, list) => {
    const yaml = require('yaml');
    const jsonProcessor = require('@putout/processor-json');
    const source = jsonProcessor.merge(rawSource, list);
    
    return yaml.stringify(parse(source));
};

function parsePlaces({error, rawSource}) {
    if (!error)
        return [];
    
    const {message, source} = error;
    const {start} = source.range;
    const [rule] = String(error).split(':');
    const place = {
        message,
        rule: `${parseRule(rule)} (yaml)`,
        position: parsePosition({
            start,
            rawSource,
        }),
    };
    
    return [place];
}

function parsePosition({start, rawSource}) {
    let line = 1;
    let lastLineStart = 0;
    
    for (let i = 0; i <= start; i++) {
        if (rawSource[i] === '\n') {
            ++line;
            lastLineStart = i;
        }
    }
    
    return {
        line,
        column: start - lastLineStart,
    };
}
