import {join} from 'node:path';
import {readFileSync, readdirSync} from 'node:fs';
import {tryCatch} from 'try-catch';
import camelCase from 'just-camel-case';

const readFixture = (dir, name) => {
    const longName = join(dir, 'fixture', name);
    
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

const rmExt = (a) => a.replace('.js', '');

export const readFixtures = (dir) => {
    const names = readdirSync(join(dir, 'fixture')).map(rmExt);
    
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
