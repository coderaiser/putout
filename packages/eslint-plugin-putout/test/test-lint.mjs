import eslint from 'putout/eslint';
import {readFile} from 'fs/promises';
import {join} from 'path';
import tryToCatch from 'try-to-catch';
import {extend} from 'supertape';

import {createCommons} from 'simport';
const {__dirname} = createCommons(import.meta.url);

const fixtureDir = join(__dirname, 'fixture');
const read = async (name) => {
    const [, data] = await tryToCatch(readFile, `${name}.js`, 'utf8');
    
    if (data)
        return [`${name}.js`, data];
    
    return [`${name}.ts`, await readFile(`${name}.ts`, 'utf8')];
};

export const test = extend({
    process: (operator) => async (name) => {
        const full = join(fixtureDir, name);
        const [resolvedName, code] = await read(full);
        const [, fixture] = await read(`${full}-fix`);
        const fix = true;
        
        const [source] = await eslint({
            name: resolvedName,
            code,
            fix,
        });
        
        return operator.equal(source, fixture);
    },
    comparePlaces: (operator) => async (name, expected) => {
        const full = join(fixtureDir, name);
        const [resolvedName, code] = await read(full);
        
        const [, places] = await eslint({
            name: resolvedName,
            code,
        });
        
        return operator.deepEqual(places, expected);
    },
});

