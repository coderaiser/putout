import {tryCatch} from 'try-catch';
import {test} from 'supertape';
import validatePlugin from './validate-plugin.js';

test('putout: engine-loader: validate-plugin', (t) => {
    const runners = {};
    const plugin = {
        report: () => {},
        fix: () => {},
        scan: () => {},
    };
    
    const [error] = tryCatch(validatePlugin, 'hello', plugin, {
        runners,
    });
    
    t.notOk(error);
    t.end();
});

test('putout: engine-loader: validate-plugin: runners', (t) => {
    const runners = {
        when: () => {},
    };
    
    const plugin = {
        report: () => {},
        fix: () => {},
        when: () => {},
    };
    
    const [error] = tryCatch(validatePlugin, 'hello', plugin, {
        runners,
    });
    
    t.notOk(error);
    t.end();
});
