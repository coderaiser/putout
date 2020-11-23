'use strict';

const yaml = require('js-yaml');
const jsonProcessor = require('@putout/processor-json');

const {stringify, parse} = JSON;

module.exports.files = [
    '*.yml',
    '*.yaml',
];

module.exports.preProcess = (rawSource) => {
    const list = [];
    const value = yaml.load(rawSource);
    const [{source}] = jsonProcessor.preProcess(stringify(value, null, 2));
    
    list.push({
        source,
        extension: 'json',
    });
    
    return list;
};

module.exports.postProcess = (rawSource, list) => {
    const source = jsonProcessor.postProcess(rawSource, list);
    const result = yaml.dump(parse(source));
    
    return result;
};

