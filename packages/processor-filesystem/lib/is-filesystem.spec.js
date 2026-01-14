import test from 'supertape';
import montag from 'montag';
import {isFilesystem} from './is-filesystem.js';

test('putout: processor-filesystem: is-filesystem', (t) => {
    const result = isFilesystem(montag`
        __putout_processor_filesystem({
            "hello": "world"
        });
    `);
    
    t.ok(result);
    t.end();
});
