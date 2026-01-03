import {join} from 'node:path';
import {readFileSync} from 'node:fs';
import {tryCatch} from 'try-catch';
import camelCase from 'just-camel-case';

const readFixture = (dir, name) => {
    const longName = join(dir, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

export const readFixtures = (dir, names) => {
    if (!names) {
        names = dir;
        dir = new URL('fixture', import.meta.url).pathname;
    } else {
        dir = join(dir, 'fixture');
    }
    
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        
        result[prop] = readFixture(dir, name);
    }
    
    return new Proxy(result, handler);
};

const handler = {
    get(obj, prop) {
        if (!obj[prop])
            throw Error(`"${prop}" not found!`);
        
        return obj[prop];
    },
};
