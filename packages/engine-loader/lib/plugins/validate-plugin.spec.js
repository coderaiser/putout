import {tryCatch} from 'try-catch';
import {test} from 'supertape';
import validatePlugin from './validate-plugin.js';

test('putout: engine-loader: validate-plugin', (t) => {
    const plugin = {
        report: () => {},
        fix: () => {},
        scan: () => {},
    };
    
    const [error] = tryCatch(validatePlugin, {
        plugin,
    });
    
    t.notOk(error);
    t.end();
});
