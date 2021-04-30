'use strict';

const {readFile} = require('fs/promises');
const {join} = require('path');

const test = require('supertape');
const remark = require('remark');

const putout = require('..');

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

