import {join} from 'node:path';
import {readFileSync} from 'node:fs';
import tryCatch from 'try-catch';
import camelCase from 'just-camel-case';

const dirFixture = new URL('fixture', import.meta.url).pathname;

const readFixture = (name) => {
    const longName = join(dirFixture, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

export const readFixtures = (names) => {
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        result[prop] = readFixture(name);
    }
    
    return new Proxy(result, handler);
};

const handler = {
    get(obj, prop) {
        /* c8 ignore start */
        if (!obj[prop])
            throw Error(`"${prop}" not found!`);
        /* c8 ignore end */
        
        return obj[prop];
    },
};
