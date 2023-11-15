'use strict';

const test = require('supertape');
const montag = require('montag');
const {isFilesystem} = require('./is-filesystem.cjs');

test('putout: processor-filesystem: is-filesystem', (t) => {
    const result = isFilesystem(montag`
        __putout_processor_filesystem({
            "hello": "world"
        });
    `);
    
    t.ok(result);
    t.end();
});
