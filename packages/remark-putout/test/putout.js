import {readFile} from 'fs/promises';
import {join} from 'path';

import test from 'supertape';
import remark from 'remark';

import putout from '../lib/putout.js';
import {createCommons} from 'simport';

const {__dirname} = createCommons(import.meta.url);

test('remark-putout', async (t) => {
    const file = await readFile(join(__dirname, 'fixture', 'js.md'), 'utf8');
    
    remark()
        .use(putout, {
            rules: {
                'strict-mode': 'off',
            },
        })
        .process(file, (err, file) => {
            const message = '"a" is defined but never used';
            
            t.equal(file.messages[0].message, message);
            t.end();
        });
});

test('remark-putout: error', async (t) => {
    const file = await readFile(join(__dirname, 'fixture', 'js-error.md'), 'utf8');
    
    remark()
        .use(putout, {
            rules: {
                'strict-mode': 'off',
            },
        })
        .process(file, (err, file) => {
            const message = 'Unterminated string constant. (1:10)';
            
            t.equal(file.messages[0].message, message);
            t.end();
        });
});

test('remark-putout: typescript', async (t) => {
    const file = await readFile(join(__dirname, 'fixture', 'ts.md'), 'utf8');
    
    remark()
        .use(putout, {
            rules: {
                'strict-mode': 'off',
            },
        })
        .process(file, (err, file) => {
            const message = '"a" is defined but never used';
            
            t.equal(file.messages[0].message, message);
            t.end();
        });
});

