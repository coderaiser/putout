import {readFile} from 'fs/promises';
import {join} from 'path';
import {extend} from 'supertape';
import eslint from 'putout/eslint';

import {createCommons} from 'simport';
const {__dirname} = createCommons(import.meta.url);

const fixtureDir = join(__dirname, 'fixture');

const test = extend({
    process: (operator) => async (name) => {
        const full = join(fixtureDir, name);
        const code = await readFile(`${full}.js`, 'utf8');
        const fixture = await readFile(`${full}-fix.js`, 'utf8');
        const fix = true;
        
        const [source] = await eslint({
            name: full,
            code,
            fix,
        });
        
        return operator.equal(source, fixture);
    },
    comparePlaces: (operator) => async (name, expected) => {
        const full = join(fixtureDir, name);
        const code = await readFile(`${full}.js`, 'utf8');
        
        const [, places] = await eslint({
            name: full,
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

