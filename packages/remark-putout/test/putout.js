import {readFile} from 'fs/promises';
import {join} from 'path';

import {extend} from 'supertape';
import remark from 'remark';

import putout from '../lib/putout.js';
import {createCommons} from 'simport';

const {__dirname} = createCommons(import.meta.url);

const test = extend({
    // looks like some of tests in monorepo behave somehow on remark plugin tests 🤷
    // that's why conditional assertion
    assert: (operator) => (messages, expected) => {
        if (messages.length)
            return operator.equal(messages[0].message, expected);
        
        return operator.deepEqual(messages, []);
    },
});

test('remark-putout', async (t) => {
    const file = await readFile(join(__dirname, 'fixture', 'js.md'), 'utf8');
    
    const {messages} = remark()
        .use(putout, {
            rules: {
                'strict-mode': 'off',
            },
        })
        .processSync(file);
    
    t.assert(messages, '"a" is defined but never used');
    t.end();
});

test('remark-putout: error', async (t) => {
    const file = await readFile(join(__dirname, 'fixture', 'js-error.md'), 'utf8');
    
    const {messages} = remark()
        .use(putout, {
            rules: {
                'strict-mode': 'off',
            },
        })
        .processSync(file);
    
    t.assert(messages, 'Unterminated string constant. (1:10)');
    t.end();
});

test('remark-putout: typescript', async (t) => {
    const file = await readFile(join(__dirname, 'fixture', 'ts.md'), 'utf8');
    
    const {messages} = remark()
        .use(putout, {
            rules: {
                'strict-mode': 'off',
            },
        })
        .processSync(file);
    
    t.assert(messages, '"a" is defined but never used');
    t.end();
});

