import {fileURLToPath} from 'node:url';
import {stub, test} from 'supertape';
import tryCatch from 'try-catch';
import read from './recursive-read.js';

const __filename = fileURLToPath(import.meta.url);

test('putout: parse-options: recursive read: dir', (t) => {
    const [result] = read(__filename, '.putout.json');
    const expected = new URL('../..', import.meta.url).pathname.slice(0, -1);
    
    t.equal(result, expected);
    t.end();
});

test('putout: parse-options: recursive read: called from eslint', (t) => {
    const [dir] = read('<input>', '.putout.json');
    
    t.notOk(dir);
    t.end();
});

test('putout: parse-options: recursive read: error', (t) => {
    const error = Error('hello');
    const require = stub().throws(error);
    
    const [resultError] = tryCatch(read, __filename, '.putout.json', {
        require,
    });
    
    t.equal(resultError, error);
    t.end();
});

test('putout: parse-options: recursive read: error: no error', (t) => {
    const require = stub().returns({
        hello: 'world',
    });
    
    const [, options] = read(__filename, '.putout.json', {
        require,
    });
    
    const expected = {
        hello: 'world',
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: recursive read: read options only once', (t) => {
    const require = stub(() => {
        if (require.callCount === 1)
            return {
                rules: {
                    putout: 'off',
                },
            };
        
        if (require.callCount === 2)
            return {
                rules: {
                    putout: 'on',
                },
            };
        
        return {};
    });
    
    const [, options] = read(__filename, '.putout.json', {
        require,
    });
    
    const expected = {
        rules: {
            putout: 'off',
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});
