import {join, dirname} from 'node:path';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import test from 'supertape';
import {codeframe} from './codeframe.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('putout: codeframe: undefined', (t) => {
    const result = codeframe({
        source: '',
        error: {},
    });
    
    t.notOk(result);
    t.end();
});

test('putout: codeframe: should return message', (t) => {
    const error = {
        message: 'some error is here',
    };
    
    const source = `
        function(a) {
            return a;
        }
    `;
    
    const result = codeframe({
        source,
        error,
    });
    
    const expected = error.message;
    
    t.equal(result, expected);
    t.end();
});

test('putout: codeframe: not highlighted', async (t) => {
    const loc = {
        line: 2,
        column: 8,
    };
    
    const error = {
        message: 'some error is here',
        loc,
    };
    
    const source = `
      function(a) {
        return a;
      }
    `;
    
    const result = codeframe({
        source,
        error,
        highlightCode: false,
    });
    
    const expected = await readFile(join(__dirname, 'fixture', 'codeframe'), 'utf8');
    
    t.equal(result, expected);
    t.end();
});
