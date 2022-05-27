import tryCatch from 'try-catch';
import justKebabCase from 'just-kebab-case';
import yaml from 'yaml';
import * as jsonProcessor from '@putout/processor-json';

const parseRule = (a) => justKebabCase(a.replace('YAML', 'Yaml'));
const {stringify, parse} = JSON;

export const files = [
    '*.yml',
    '*.yaml',
];

export const branch = (rawSource) => {
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

export const find = (rawSource) => {
    const [error] = tryCatch(yaml.parse, rawSource);
    const places = parsePlaces({
        error,
    });
    
    return places;
};

export const merge = (rawSource, list) => {
    const source = jsonProcessor.merge(rawSource, list);
    
    return yaml.stringify(parse(source));
};

function parseMessage(message) {
    const [first] = message.split('\n');
    return first.replace(/\sat.*/g, '');
}

function parsePlaces({error}) {
    if (!error)
        return [];
    
    const {
        message,
        linePos,
    } = error;
    const [rule] = String(error).split(':');
    const place = {
        message: parseMessage(message),
        rule: `${parseRule(rule)} (yaml)`,
        position: parsePosition(linePos),
    };
    
    return [place];
}

function parsePosition(linePos) {
    const [{line, col}] = linePos;
    return {
        line,
        column: col,
    };
}
