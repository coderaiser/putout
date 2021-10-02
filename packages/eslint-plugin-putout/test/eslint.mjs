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
        
        const [source] = await eslint({name, code, fix});
        
        return operator.equal(source, fixture);
    },
});

test('eslint-plugin-putout: no-resolve: places', async (t) => {
    const name = join(fixtureDir, 'no-unresolved.js');
    const code = await readFile(name, 'utf8');
    
    const [, places] = await eslint({name, code});
    const expected = {
        message: 'Always add an extension to relative imports',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    };
    
    t.deepEqual(places[0], expected);
    t.end();
});

test('eslint-plugin-putout: no-resolve: fix', async (t) => {
    const name = join(fixtureDir, 'no-unresolved');
    const code = await readFile(`${name}.js`, 'utf8');
    const fixture = await readFile(`${name}-fix.js`, 'utf8');
    const fix = true;
    
    const [source] = await eslint({name, code, fix});
    
    t.equal(source, fixture);
    t.end();
});

test('eslint-plugin-putout: evaluate: fix', async ({process}) => {
    await process('evaluate');
});

