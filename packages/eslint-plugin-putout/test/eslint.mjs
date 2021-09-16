import {readFile} from 'fs/promises';
import {join} from 'path';
import test from 'supertape';
import eslint from 'putout/eslint';

import {createCommons} from 'simport';
const {__dirname} = createCommons(import.meta.url);

const fixture = join(__dirname, 'fixture');

test('eslint-plugin-putout: no-resolve: places', async (t) => {
    const name = join(fixture, 'no-unresolved.js');
    const code = await readFile(name, 'utf8');
    
    const [, places] = await eslint({name, code});
    const expected = [{
        message: 'Always add an extension to relative imports',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'putout/no-unresolved (eslint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('eslint-plugin-putout: no-resolve: fix', async (t) => {
    const name = join(fixture, 'no-unresolved.js');
    const code = await readFile(name, 'utf8');
    const fix = true;
    
    const [source] = await eslint({name, code, fix});
    const expected = `import index from '../../lib/index.js';\n`;
    
    t.deepEqual(source, expected);
    t.end();
});

