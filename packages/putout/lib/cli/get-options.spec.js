import process from 'node:process';
import tryCatch from 'try-catch';
import {test, stub} from 'supertape';
import getOptions from './get-options.js';

test('putout: cli: get-options: PUTOUT_CONFIG_FILE', (t) => {
    const {PUTOUT_CONFIG_FILE} = process.env;
    
    process.env.PUTOUT_CONFIG_FILE = './hello-config';
    
    const parseOptions = stub().returns({
        from: 'parse-options',
        plugins: [],
    });
    
    const [error] = tryCatch(getOptions, {
        parseOptions,
    });
    
    if (!PUTOUT_CONFIG_FILE)
        delete process.env.PUTOUT_CONFIG_FILE;
    else
        process.env.PUTOUT_CONFIG_FILE = PUTOUT_CONFIG_FILE;
    
    t.match(error.message, /^Cannot find module/);
    t.end();
});
