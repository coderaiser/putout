import {readFile} from 'fs/promises';
import {join} from 'path';

import eslint from 'putout/eslint';
import tryToCatch from 'try-to-catch';
import {extend} from 'supertape';

const config = {
    extends: [
        'plugin:n/recommended',
        'plugin:eslint-plugin/recommended',
        'plugin:putout/recommended',
    ],
};

const read = async (name) => {
    const [, data] = await tryToCatch(readFile, `${name}.js`, 'utf8');
    
    if (data)
        return [`${name}.js`, data];
    
    return [`${name}.ts`, await readFile(`${name}.ts`, 'utf8')];
};

export const createTest = (url) => {
    const fixtureDir = new URL('fixture', url).pathname;
    
    return extend({
        process: (operator) => async (name, override) => {
            const full = join(fixtureDir, name);
            const [resolvedName, code] = await read(full);
            const [, fixture] = await read(`${full}-fix`);
            const fix = true;
            
            const [source] = await eslint({
                name: resolvedName,
                code,
                fix,
                putout: true,
                config: {
                    ...config,
                    ...override,
                },
            });
            
            return operator.equal(source, fixture);
        },
        noProcess: (operator) => async (name) => {
            const full = join(fixtureDir, name);
            const [resolvedName, code] = await read(full);
            const fix = true;
            
            const [source] = await eslint({
                name: resolvedName,
                config,
                code,
                fix,
            });
            
            return operator.equal(source, code);
        },
        comparePlaces: (operator) => async (name, expected, override) => {
            const full = join(fixtureDir, name);
            const [resolvedName, code] = await read(full);
            
            const [, places] = await eslint({
                name: resolvedName,
                code,
                config: {
                    ...config,
                    ...override,
                },
            });
            
            return operator.deepEqual(places, expected);
        },
    });
};

