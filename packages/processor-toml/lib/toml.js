import {tryCatch} from 'try-catch';
import {format} from 'oxfmt';
import * as toml from 'smol-toml';
import {
    __toml,
    toJS,
    fromJS,
    isTOML,
} from '@putout/operator-json';

const {stringify, parse} = JSON;

export const files = ['*.toml'];

export const branch = (rawSource) => {
    const list = [];
    const [error, value] = tryCatch(toml.parse, rawSource);
    
    if (error)
        return [];
    
    const stringified = stringify(value, null, 4);
    const source = toJS(stringified, __toml);
    
    list.push({
        source,
        extension: 'json',
    });
    
    return list;
};

export const find = (rawSource) => {
    const [error] = tryCatch(toml.parse, rawSource);
    const places = parsePlaces({
        error,
    });
    
    return places;
};

export const merge = async (rawSource, list) => {
    const [first] = list.filter(isTOML);
    const source = fromJS(first, __toml);
    const ast = parse(source);
    const input = toml.stringify(ast);
    
    const {code} = await format('__putout_processor.toml', input);
    
    return code;
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
        line,
        column,
    } = error;
    
    const place = {
        message: parseMessage(message),
        rule: `toml-parse-error (toml)`,
        position: {
            line,
            column,
        },
    };
    
    return [place];
}
