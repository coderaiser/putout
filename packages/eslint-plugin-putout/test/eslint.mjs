import tryToCatch from 'try-to-catch';
import {readFile} from 'fs/promises';
import {join} from 'path';
import {extend} from 'supertape';
import eslint from 'putout/eslint';

import {createCommons} from 'simport';
const {__dirname} = createCommons(import.meta.url);

const fixtureDir = join(__dirname, 'fixture');
const read = async (name) => {
    const [, data] = await tryToCatch(readFile, `${name}.js`, 'utf8');
    
    if (data)
        return [`${name}.js`, data];
    
    return [`${name}.ts}`, await readFile(`${name}.ts`, 'utf8')];
};

const test = extend({
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

test('eslint-plugin-putout: no-resolve: places', async ({comparePlaces}) => {
    await comparePlaces('no-unresolved-message', [{
        message: 'Always add an extension to relative imports',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    }]);
});

test('eslint-plugin-putout: no-resolve: fix', async ({process}) => {
    await process('no-unresolved');
});

test('eslint-plugin-putout: evaluate: fix', async ({process}) => {
    await process('evaluate');
});

